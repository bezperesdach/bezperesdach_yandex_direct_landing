import { component$ } from "@builder.io/qwik";
import Logo from "@/components/icons/logo/IconLogo";
import ToggleTheme from "../common/ToggleTheme";
import MobileIconLogo from "../icons/logo/mobileIconLogo";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="navbar m-auto lg:w-[1024px] px-4 pt-6 sm:px-7 lg:px-0 sm:pt-0">
      <div class="flex-1">
        <Link href="/" class="hidden xs:block">
          <Logo height={64} />
        </Link>
        <Link href="/" class="block xs:hidden">
          <MobileIconLogo height={48} />
        </Link>
      </div>
      <div class="flex-none">
        <ToggleTheme />
      </div>
    </div>
  );
});
