import { component$ } from "@builder.io/qwik";

type IconProps = {
  width?: number;
  height?: number;
  href?: string;
  target?: string;
  rel?: string;
  title?: string;
};

export default component$<IconProps>(({ width = 48, height = 48, title, href, target, rel }) => {
  const icon = (
    <>
      <path
        fill="#fff"
        d="M67.48 23.22H24.5c-3.62 0-6.56 2.94-6.56 6.56v32.16c0 3.62 2.94 6.56 6.56 6.56h42.99c3.62 0 6.56-2.94 6.56-6.56V29.78c0-3.62-2.94-6.56-6.56-6.56h-.01Zm-4.36 6.41L46.02 41.9 29.43 29.63h33.69Zm4.36 32.47H24.5c-.08 0-.15-.07-.15-.15v-28.1l21.61 15.98 21.67-15.54v27.66c0 .08-.07.15-.15.15Z"
      />
    </>
  );

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 92 92" fill="none" role="group">
      <title>{title}</title>
      {href ? (
        <a href={href} target={target} rel={rel} aria-label={title}>
          {icon}
        </a>
      ) : (
        icon
      )}
    </svg>
  );
});
