import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="m-auto lg:w-[1024px] py-5 sm:py-10 grid row-span-2 xl:grid-cols-4 gap-4 ">
      <div class="xl:col-span-3 pr-6 pl-3 sm:pl-6 lg:pl-0">
        <p class="text-2xl">
          <span class="font-bold">Безпересдач</span> - онлайн-проект помощи студентам
        </p>

        <p class="text-xs tracking-widest text-opacity-80 text-base-content mt-4">
          Используя сервис “Безпересдач”, вы принимаете <Link class="link">пользовательское соглашение</Link>, а также{" "}
          <Link class="link">политику обработки персональных данных</Link>
        </p>
        <p class="text-xs tracking-widest text-opacity-80 text-base-content mt-4">©2022-{new Date().getFullYear()} Безпересдач </p>
      </div>
      <div class="pl-3 sm:pl-6 lg:pl-0 xl:col-span-1">
        <p class="text-xl">Контакты</p>
        <div class="flex flex-col gap-4 justify-center mt-2">
          <a
            class="text-primary  cursor-pointer text-sm w-fit"
            href="mailto:help@bezperesdach.ru"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            help@bezperesdach.ru
          </a>
          <a
            class="text-primary cursor-pointer text-sm w-fit"
            href="https://vk.com/bezperesdach_official"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            vk.com/bezperesdach_official
          </a>
          <a
            class="text-primary  cursor-pointer text-sm w-fit"
            href="https://t.me/bezperesdach_bot"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            t.me/bezperesdach_bot
          </a>
        </div>
      </div>
    </div>
  );
});
