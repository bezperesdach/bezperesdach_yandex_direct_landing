import { component$ } from "@builder.io/qwik";

export interface LogoProps {
  width?: number;
  height?: number;
}

export default component$<LogoProps>(({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 1846 387"
      width={width}
      height={height}
    >
      <path
        fill="#1170EE"
        fillRule="nonzero"
        d="M299 183h65v36h-65v-36Zm3 55h73v37H254V129h118v37h-70v72Zm95 27 14-33a131 131 0 0 0 38 8l15-1 12-4c2-2 4-4 4-7 0-4-2-6-4-7-3-2-7-2-11-2h-39v-36h35c4 0 7 0 9-2 3-2 4-4 4-6 0-3-1-5-4-7-2-2-6-3-10-3l-14-1-15 3-16 7-15-36a135 135 0 0 1 65-11c12 1 21 3 30 7 9 3 16 8 21 14s7 13 7 21-2 13-5 19c-4 5-9 9-16 12-6 3-13 5-22 5l1-10c10 0 18 2 25 5 8 4 13 8 17 14s6 13 6 20c0 8-2 13-6 19-3 5-9 10-15 14-7 3-14 6-23 8a128 128 0 0 1-58 0c-10-2-20-5-30-10Zm150 10V129h141v146h-49V157l11 10h-65l10-10v118h-48Zm218-92h65v36h-65v-36Zm3 55h73v37H720V129h119v37h-71v72Zm97 37V129h70c13 0 25 2 35 7 10 4 18 11 23 19 6 8 8 18 8 29s-3 21-8 29c-5 9-13 15-23 19-10 5-22 7-35 7h-43l22-21v57h-49Zm49-51-22-23h40c7 0 12-1 15-4s5-8 5-13-2-9-5-12-9-5-15-5h-40l22-22v79Zm150-41h65v36h-65v-36Zm3 55h73v37h-121V129h118v37h-70v72Zm172 40c-12 0-23-2-33-5-10-4-18-9-25-16a72 72 0 0 1-23-55 72 72 0 0 1 49-71 99 99 0 0 1 70 2c11 6 20 13 27 22l-31 28c-4-6-9-10-14-13s-11-4-18-4a33 33 0 0 0-24 9c-3 3-6 7-7 12a44 44 0 0 0 0 30c1 4 4 8 7 11 3 4 6 6 10 8l14 2c6 0 13-1 18-4s10-8 14-13l31 28c-7 9-16 16-27 21s-24 8-38 8Zm182-24v-87h-33l-1 11a324 324 0 0 1-4 40l-5 14-6 11-52-6c4 0 8-2 11-5s5-7 7-13l4-20 2-25 2-45h123v125h-48Zm-105 49v-66h172v66h-45v-28h-82v28h-45Zm189-28 64-146h48l64 146h-51l-47-122h19l-47 122h-50Zm38-25 12-36h67l13 36h-92Zm225-24-17 5-16 2c-21 0-37-5-48-15-12-11-17-25-17-45v-44h48v39c0 9 2 15 6 19 4 5 10 7 18 7l14-2 11-4 1 38Zm-6 49V129h48v146h-48Z"
      />
      <path fill="#fff" d="M123 178h19v43h-19v-43Zm97-60-61-24v46" />
      <path
        fill="#1170EE"
        d="M173 175h-53c-13 0-24 12-24 25s11 22 23 22h40c10 0 17 8 17 17v7c0 9-7 17-17 17l-64-2c-8 0-14-6-14-14v-87c0-11 8-20 19-20h67l53-22-53-24H76c-26 0-46 20-46 45v116c0 28 22 51 51 51h92c29 0 52-23 52-51v-26c0-30-23-54-52-54Zm-34 42h-11v-35h11v35Z"
      />
      <path fill="#fff" fillRule="nonzero" d="m197 115-30-9-7 5 7 7-7 6 7 4 30-9v-4Z" />
    </svg>
  );
});
