import createConfetti from "@/utils/confetti";
import { isDevelopment } from "@/utils/utils";
import { ym } from "@/utils/yandex-metrica";

import { component$, $, useSignal, useTask$ } from "@builder.io/qwik";
import { server$, type DocumentHead } from "@builder.io/qwik-city";

export const serverFunction = server$(async function (email: string) {
  const API_URL = isDevelopment ? "http://127.0.0.1:1337/api" : this.env.get("BACKEND_API_URL");
  try {
    const response = await fetch(`${API_URL}/order/direct-submission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.headers.get("X-Forwarded-For") && { "X-Forwarded-For": this.headers.get("X-Forwarded-For")! }),
      },
      body: JSON.stringify({
        email,
        secret: this.env.get("SERVER_PRIVATE_KEY"),
      }),
    });

    if (response.status !== 200) {
      return false;
    }
  } catch (err) {
    return false;
  }

  return true;
});

export default component$(() => {
  const submitLoading = useSignal(false);
  const submitSuccess = useSignal(false);

  const inputText = useSignal("");
  const inputError = useSignal("");
  const submitError = useSignal("");

  const onSubmit = $(async () => {
    console.log("submit");

    if (inputText.value.trim().length === 0) {
      inputError.value = "Поле не может быть пустым";
      return;
    }

    if (!inputText.value.trim().match(/([a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)) {
      inputError.value = "Неверный email";
      return;
    }

    submitLoading.value = true;
    const response = await serverFunction(inputText.value);
    if (response) {
      ym("reachGoal", "orderSuccess");
      createConfetti();
      submitSuccess.value = true;
      submitLoading.value = false;
    } else {
      submitLoading.value = false;
      submitError.value = "Не удалось отправить сообщение на почту";
    }
  });

  useTask$(({ track }) => {
    track(() => inputText.value);
    inputError.value = "";
  });

  return (
    <div class="flex flex-col">
      <input type="checkbox" id="my_modal_7" class="modal-toggle" checked={submitSuccess.value} />
      <div class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-xl sm:text-3xl text-primary mb-4">Успех!</h3>
          <p class="text-xl sm:text-2xl py-4">
            Мы успешно отправили сообщение на почту <span class="font-semibold text-primary">{inputText.value}</span>
          </p>
          <p class="text-lg sm:text-xl text-opacity-70 text-base-content py-4">
            Если вы не нашли его во входящих, не забудьте проверить папку спам
          </p>

          <div class="modal-action">
            <button
              class="btn btn-primary"
              onClick$={() => {
                submitSuccess.value = false;
                inputText.value = "";
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>

      <div class="m-auto lg:w-[1024px] mt-6 sm:mt-12 px-8">
        <h1 class="font-bold text-xl sm:text-3xl text-center">
          <span class="text-primary">Безпересдач</span> - сервис онлайн помощи студентам
        </h1>
        <p class="font-semibold mt-4 text-lg sm:text-2xl text-center text-opacity-70 text-base-content">
          Помогаем студентам по всей России и СНГ получать <br />
          отличные оценки!
        </p>
      </div>

      <div class="bg-base-300  w-full mt-10 sm:mt-20 shadow-[inset_0_0px_4px_1px_rgba(0,0,0,0.3)] relative">
        <div
          class="absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10"
          style="background-image: url(/document.webp);opacity: 0.1;"
        />
        <div class="m-auto lg:w-[1024px] flex flex-col justify-center items-center pb-10 sm:pb-20 lg:pb-30 mx-3 sm:mx-6 lg:mx-auto z-20 relative">
          <div class="lg:w-[900px] rounded-lg bg-base-100 p-8 shadow-lg my-10 flex flex-col justify-center items-center">
            <h2 class="font-semibold text-lg sm:text-2xl text-center">
              Получи доступ к сервису в 2 клика - это <span class="font-bold text-primary">бесплатно</span>{" "}
            </h2>

            <div class="form-control w-full max-w-xs mt-5 sm:mt-14">
              <label class="label">
                <span class="label-text-alt font-medium text-opacity-70 text-base-content">
                  Email<span class="text-error">*</span>
                </span>
              </label>
              <input
                bind:value={inputText}
                type="email"
                placeholder="Ваш email"
                class="input input-bordered input-primary w-full max-w-xs"
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                spellcheck={false}
                disabled={submitLoading.value}
                onFocus$={() => (submitError.value = "")}
              />

              <label class="label">
                {inputError.value !== "" && <span class="label-text font-medium text-opacity-70 text-error">{inputError.value}</span>}
              </label>
            </div>

            <div class="flex flex-col mb-5 sm:mb-10 items-center">
              <button type="button" class="btn btn-primary btn-wide mt-7 sm:mt-10 " disabled={submitLoading.value} onClick$={onSubmit}>
                {submitLoading.value && <span class="loading loading-spinner"></span>}
                Получить доступ
              </button>
              {submitError.value !== "" && (
                <label class="label">
                  <span class="font-medium text-opacity-70 text-error text-center">{submitError.value}</span>
                </label>
              )}
            </div>
          </div>
        </div>
        <div class="m-auto lg:w-[1024px] flex flex-col justify-center items-center mb-10 mx-3 sm:mx-6 lg:mx-auto z-20 relative">
          <div class="pt-10 w-full sm:w-fit lg:w-[1024px] rounded-lg bg-base-100 ">
            <h2 class="font-bold text-xl sm:text-3xl text-center">Наши преимущества</h2>
            <div class="py-5 sm:py-10 mt-1 px-8 grid gap-8 sm:gap-6  sm:grid-cols-2 lg:grid-cols-4 justify-evenly items-center">
              <div class="flex flex-col items-center basis-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 1024 1024" class="icon" version="1.1">
                  <path
                    d="M142.9 736c-11.5 0-22.7-6.3-28.4-17.2C81.5 655.4 64 583.9 64 512c0-60.5 11.8-119.1 35.2-174.4 22.6-53.4 54.9-101.3 96-142.4s89-73.4 142.4-96C392.9 75.8 451.5 64 512 64c47.3 0 93.9 7.3 138.4 21.8 16.8 5.5 26 23.5 20.6 40.3-5.5 16.8-23.5 26-40.3 20.6C592.5 134.3 552.6 128 512 128c-211.7 0-384 172.3-384 384 0 62.5 14.5 122.2 43.2 177.2 8.2 15.7 2.1 35-13.6 43.2-4.7 2.4-9.7 3.6-14.7 3.6zM704.2 913.1c-11.5 0-22.7-6.3-28.4-17.2-8.2-15.7-2.1-35 13.6-43.2C816.8 786.2 896 655.7 896 512c0-19.8-1.5-39.7-4.5-59.1-2.7-17.5 9.3-33.8 26.7-36.5 17.5-2.7 33.8 9.3 36.5 26.7 3.5 22.6 5.3 45.8 5.3 68.9 0 83.5-23.1 164.9-66.8 235.5-42.5 68.6-102.7 124.6-174.2 161.9-4.8 2.5-9.9 3.7-14.8 3.7z"
                    fill="#EDECEC"
                  />
                  <path d="M259.9 530.5a117.2 146.5 0 1 0 234.4 0 117.2 146.5 0 1 0-234.4 0Z" fill="#1d4ed8" />
                  <path
                    d="M506.1 960c140.7 0 160.9-65.1 43.7-143-49.5-32.9-108.9-52-172.7-52s-123.3 19.2-172.7 52c-117.2 77.9-97 143 43.7 143h258z"
                    fill="#1d4ed8"
                  />
                  <path d="M733.2 193.1a52.1 65.1 0 1 0 104.2 0 52.1 65.1 0 1 0-104.2 0Z" fill="#8C9EFF" />
                  <path
                    d="M842.7 384c62.5 0 71.5-28.9 19.4-63.5-22-14.6-48.4-23.1-76.8-23.1s-54.8 8.5-76.8 23.1c-52.1 34.6-43.1 63.5 19.4 63.5h114.8z"
                    fill="#8C9EFF"
                  />
                </svg>
                <div class="text-center font-medium mt-4">
                  Мы помогли более <span class="text-primary font-bold">1 500</span> студентам
                </div>
              </div>

              <div class="flex flex-col items-center basis-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 1024 1024" class="icon" version="1.1">
                  <path
                    d="M896 192H128c-35.3 0-64 28.7-64 64v512c0 35.3 28.7 64 64 64h576.6l191.6 127.7L896 832c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64z"
                    fill="#1d4ed8"
                  />
                  <path
                    d="M640 512c0-125.4-51.5-238.7-134.5-320H128c-35.3 0-64 28.7-64 64v512c0 35.3 28.7 64 64 64h377.5c83-81.3 134.5-194.6 134.5-320z"
                    fill="#3b82f6"
                  />
                  <path d="M256 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#FFF" />
                  <path d="M512 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#FFF" />
                  <path d="M768 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#FFF" />
                </svg>
                <div class="text-center font-medium mt-4">
                  Мы <span class="text-primary font-bold">всегда</span> на связи и ответим на любой вопрос
                </div>
              </div>

              <div class="flex flex-col items-center basis-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 1024 1024" class="icon" version="1.1">
                  <path
                    d="M472.4 76.6c-49.3 38.9-144.2 109.5-285.9 115.2-31.5 1.3-57.4 26.1-58.4 57.6v421.3c0 20.8 10.1 40.4 27.2 52.4l321.4 226c21.5 14.3 49.5 14.3 71 0l321.2-226c17-12 27.2-31.5 27.2-52.3v-417-2.2c-1.1-31.4-26.9-56.1-58.2-57.4-141.8-5.9-236.6-78.4-286-117.4-22-17.4-57.6-17.5-79.5-0.2z"
                    fill="#1d4ed8"
                  />
                  <path
                    d="M704 511.9c0-182.6-109.3-339.7-266-409.5-54.1 38.3-137.8 84.7-251.7 89.3-31.4 1.2-57.2 26.2-58.3 57.6v421.3c0 20.8 10.1 40.4 27.2 52.4l282.5 198.6C594.6 851.9 704 694.7 704 511.9z"
                    fill="#3b82f6"
                  />
                  <path
                    d="M640.1 576h-256c-35.3 0-64-28.7-64-64s28.7-64 64-64h256.1c35.3 0 64 28.7 64 64-0.1 35.3-28.7 64-64.1 64z"
                    fill="#FFF"
                  />
                  <path
                    d="M576 352.1v319.8c0 35.3-28.7 64-64 64s-64-28.7-64-64V352.1c0-35.3 28.7-64 64-64s64 28.6 64 64z"
                    fill="#FFF"
                  />
                </svg>
                <div class="text-center font-medium mt-4">
                  Эксперты прошедшие <span class="text-primary font-bold">строгий</span> отбор
                </div>
              </div>

              <div class="flex flex-col items-center basis-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 1024 1024" class="icon" version="1.1">
                  <path
                    d="M836.136692 0h-127.975005l-191.962507 143.97188 60.588166 45.391135c7.298574-2.09959 14.297208-5.598906 20.495997-10.198008L836.136692 0z"
                    fill="#1d4ed8"
                  />
                  <path
                    d="M192.062488 160.168717v703.862527c0 35.293107 28.694396 63.987502 63.987502 63.987502h511.90002c35.293107 0 63.987502-28.694396 63.987502-63.987502V160.168717c0-35.293107-28.694396-63.987502-63.987502-63.987502H256.04999c-35.293107 0-63.987502 28.694396-63.987502 63.987502z m479.906268 63.987502H352.031244c-17.696544 0-31.993751-14.297208-31.993751-31.993751s14.297208-31.993751 31.993751-31.993751h319.937512c17.696544 0 31.993751 14.297208 31.993751 31.993751s-14.297208 31.993751-31.993751 31.993751z"
                    fill="#1d4ed8"
                  />
                  <path
                    d="M703.962507 512.09998c0-109.678578-39.392306-210.058973-104.779535-287.943761H352.031244c-17.696544 0-31.993751-14.297208-31.993751-31.993751s14.297208-31.993751 31.993751-31.993751h181.164616c-33.393478-26.294864-70.486233-47.990627-110.578402-63.987502H256.04999c-35.293107 0-63.987502 28.694396-63.987502 63.987502v703.862527c0 35.293107 28.694396 63.987502 63.987502 63.987502h166.567468C587.485257 861.931654 703.962507 700.663152 703.962507 512.09998z"
                    fill="#3b82f6"
                  />
                  <path
                    d="M324.136692 0h-127.975005l238.95333 179.165007c6.198789 4.599102 13.097442 8.098418 20.495996 10.198008 5.698887 1.699668 11.597735 2.499512 17.596564 2.599492h85.583284c6.098809 0 12.097637-0.899824 17.896505-2.599492L324.136692 0z"
                    fill="#EDECEC"
                  />
                  <path
                    d="M416.018746 448.312439a119.976567 95.981254 90 1 0 191.962508 0 119.976567 95.981254 90 1 0-191.962508 0Z"
                    fill="#FFF"
                  />
                  <path
                    d="M617.67936 799.843781c115.177504 0 131.674282-53.289592 35.793009-117.077134-40.492091-26.894747-89.182582-42.591681-141.472369-42.591681s-100.880297 15.696934-141.472369 42.591681c-95.981254 63.787541-79.384495 117.077133 35.793009 117.077134h211.35872z"
                    fill="#FFF"
                  />
                </svg>
                <div class="text-center font-medium mt-4">
                  Полная <span class="text-primary font-bold">анонимность</span> и{" "}
                  <span class="text-primary font-bold">безопасность</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Безпересдач - онлайн сервис помощи студентам",
  meta: [
    {
      name: "Безпересдач - онлайн сервис помощи студентам",
      content: "Помогаем студентам по всей России и СНГ получать отличные оценки!",
    },
  ],
};
