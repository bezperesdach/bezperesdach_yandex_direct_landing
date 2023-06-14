import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="flex h-96 justify-center">
      <div class="flex flex-col gap-4 justify-center items-center">
        <h1 class="text-2xl sm:text-6xl font-bold text-primary">404</h1>
        <p class="text-xl">Страница не найдена</p>
        <Link href="/" class="btn btn-primary">
          На главную
        </Link>
      </div>
    </div>
  );
});
