import { ComponentProps } from "react";
import cx from "clsx";

interface IconProps extends ComponentProps<"svg"> {
  iconClassName?: string;
  className?: string;
}

export const CheckedIcon: React.FC<IconProps> = ({
  className,
  iconClassName,
}) => {
  return (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 7.7065L6 10.207L10.5 5.7075L9.7925 5L6 8.793L4.2065 7L3.5 7.7065Z"
        fill="#1E8E3E"
      />
      <path
        d="M3.11101 1.67971C4.26216 0.910543 5.61553 0.5 7 0.5C8.85652 0.5 10.637 1.2375 11.9497 2.55025C13.2625 3.86301 14 5.64348 14 7.5C14 8.88447 13.5895 10.2378 12.8203 11.389C12.0511 12.5401 10.9579 13.4373 9.67879 13.9672C8.3997 14.497 6.99224 14.6356 5.63437 14.3655C4.2765 14.0954 3.02922 13.4287 2.05026 12.4497C1.07129 11.4708 0.404603 10.2235 0.134506 8.86563C-0.13559 7.50776 0.00303298 6.1003 0.532846 4.82122C1.06266 3.54213 1.95987 2.44888 3.11101 1.67971ZM3.66658 12.4888C4.65328 13.1481 5.81332 13.5 7 13.5C8.5913 13.5 10.1174 12.8679 11.2426 11.7426C12.3679 10.6174 13 9.0913 13 7.5C13 6.31331 12.6481 5.15327 11.9888 4.16658C11.3295 3.17988 10.3925 2.41085 9.2961 1.95672C8.19975 1.5026 6.99335 1.38378 5.82946 1.61529C4.66558 1.8468 3.59648 2.41824 2.75736 3.25736C1.91825 4.09647 1.3468 5.16557 1.11529 6.32946C0.88378 7.49334 1.0026 8.69974 1.45673 9.7961C1.91085 10.8925 2.67989 11.8295 3.66658 12.4888Z"
        className={cx("fill-[#1E8E3E]", iconClassName)}
      />
    </svg>
  );
};

export const FailedIcon: React.FC<IconProps> = ({
  className,
  iconClassName,
}) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 7C14 3.13401 10.866 1.18292e-06 7 0C3.13401 -2.14186e-06 1.18292e-06 3.134 0 7C-2.14186e-06 10.866 3.134 14 7 14C10.866 14 14 10.866 14 7ZM4.67091 3.94754L7.00001 6.29075L9.32912 3.94754L10.0384 4.65251L7.70499 7L10.0383 9.34749L9.32911 10.0525L7.00001 7.70925L4.67092 10.0525L3.96168 9.34749L6.29503 7L3.96167 4.65251L4.67091 3.94754Z"
        fill="#D93026"
      />
    </svg>
  );
};

//iconfy icons, better to use iconfy dirrectly for better extensibility rather than like this. But since it's just for the exercise, no extensibility is considered, this will temporarily be this way
export const RockIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="70"
    height="70"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M408.864 79.052c-22.401-33.898-66.108-42.273-98.813-23.588c-29.474-31.469-79.145-31.093-108.334-.022c-47.16-27.02-108.71 5.055-110.671 60.806C44.846 105.407 0 140.001 0 187.429v56.953c0 32.741 14.28 63.954 39.18 85.634l97.71 85.081c4.252 3.702 3.11 5.573 3.11 32.903c0 17.673 14.327 32 32 32h252c17.673 0 32-14.327 32-32c0-23.513-1.015-30.745 3.982-42.37l42.835-99.656c6.094-14.177 9.183-29.172 9.183-44.568V146.963c0-52.839-54.314-88.662-103.136-67.911zM464 261.406a64.505 64.505 0 0 1-5.282 25.613l-42.835 99.655c-5.23 12.171-7.883 25.04-7.883 38.25V432H188v-10.286c0-16.37-7.14-31.977-19.59-42.817l-97.71-85.08C56.274 281.255 48 263.236 48 244.381v-56.953c0-33.208 52-33.537 52 .677v41.228a16 16 0 0 0 5.493 12.067l7 6.095A16 16 0 0 0 139 235.429V118.857c0-33.097 52-33.725 52 .677v26.751c0 8.836 7.164 16 16 16h7c8.836 0 16-7.164 16-16v-41.143c0-33.134 52-33.675 52 .677v40.466c0 8.836 7.163 16 16 16h7c8.837 0 16-7.164 16-16v-27.429c0-33.03 52-33.78 52 .677v26.751c0 8.836 7.163 16 16 16h7c8.837 0 16-7.164 16-16c0-33.146 52-33.613 52 .677v114.445z"
    />
  </svg>
);

export const PaperIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="70"
    height="70"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M372.57 112.641v-10.825c0-43.612-40.52-76.691-83.039-65.546c-25.629-49.5-94.09-47.45-117.982.747C130.269 26.456 89.144 57.945 89.144 102v126.13c-19.953-7.427-43.308-5.068-62.083 8.871c-29.355 21.796-35.794 63.333-14.55 93.153L132.48 498.569a32 32 0 0 0 26.062 13.432h222.897c14.904 0 27.835-10.289 31.182-24.813l30.184-130.958A203.637 203.637 0 0 0 448 310.564V179c0-40.62-35.523-71.992-75.43-66.359zm27.427 197.922c0 11.731-1.334 23.469-3.965 34.886L368.707 464h-201.92L51.591 302.303c-14.439-20.27 15.023-42.776 29.394-22.605l27.128 38.079c8.995 12.626 29.031 6.287 29.031-9.283V102c0-25.645 36.571-24.81 36.571.691V256c0 8.837 7.163 16 16 16h6.856c8.837 0 16-7.163 16-16V67c0-25.663 36.571-24.81 36.571.691V256c0 8.837 7.163 16 16 16h6.856c8.837 0 16-7.163 16-16V101.125c0-25.672 36.57-24.81 36.57.691V256c0 8.837 7.163 16 16 16h6.857c8.837 0 16-7.163 16-16v-76.309c0-26.242 36.57-25.64 36.57-.691v131.563z"
    />
  </svg>
);

export const ScissorsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="70"
    height="70"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="m256 480l70-.013c5.114 0 10.231-.583 15.203-1.729l118.999-27.427C490.56 443.835 512 417.02 512 386.277V180.575c0-23.845-13.03-45.951-34.005-57.69l-97.999-54.853c-34.409-19.261-67.263-5.824-92.218 24.733L142.85 37.008c-37.887-14.579-80.612 3.727-95.642 41.201c-15.098 37.642 3.635 80.37 41.942 95.112L168 192l-94-9.141c-40.804 0-74 32.811-74 73.14c0 40.33 33.196 73.141 74 73.141h87.635c-3.675 26.245 8.692 51.297 30.341 65.006C178.657 436.737 211.044 480 256 480zm0-48.013c-25.16 0-25.12-36.567 0-36.567c8.837 0 16-7.163 16-16v-6.856c0-8.837-7.163-16-16-16h-28c-25.159 0-25.122-36.567 0-36.567h28c8.837 0 16-7.163 16-16v-6.856c0-8.837-7.163-16-16-16H74c-34.43 0-34.375-50.281 0-50.281h182c8.837 0 16-7.163 16-16v-11.632a16 16 0 0 0-10.254-14.933L106.389 128.51c-31.552-12.14-13.432-59.283 19.222-46.717l166.549 64.091a16.001 16.001 0 0 0 18.139-4.812l21.764-26.647c5.82-7.127 16.348-9.064 24.488-4.508l98 54.854c5.828 3.263 9.449 9.318 9.449 15.805v205.701c0 8.491-5.994 15.804-14.576 17.782l-119.001 27.427a19.743 19.743 0 0 1-4.423.502h-70z"
    />
  </svg>
);

export const LizardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="70"
    height="70"
    viewBox="0 0 576 512"
  >
    <path
      fill="currentColor"
      d="M556.686 290.542L410.328 64.829C397.001 44.272 374.417 32 349.917 32H56C25.121 32 0 57.122 0 88v8c0 44.112 35.888 80 80 80h196.042l-18.333 48H144c-48.523 0-88 39.477-88 88c0 30.879 25.121 56 56 56h131.552c2.987 0 5.914.549 8.697 1.631L352 408.418V480h224V355.829c0-23.225-6.679-45.801-19.314-65.287zM528 432H400v-23.582c0-19.948-12.014-37.508-30.604-44.736l-99.751-38.788A71.733 71.733 0 0 0 243.552 320H112c-4.411 0-8-3.589-8-8c0-22.056 17.944-40 40-40h113.709c19.767 0 37.786-12.407 44.84-30.873l24.552-64.281c8.996-23.553-8.428-48.846-33.63-48.846H80c-17.645 0-32-14.355-32-32v-8c0-4.411 3.589-8 8-8h293.917c8.166 0 15.693 4.09 20.137 10.942l146.358 225.715A71.84 71.84 0 0 1 528 355.829V432z"
    />
  </svg>
);

export const SpockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="70"
    height="70"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M501.03 116.176c-19.39-31.508-51.244-35.728-66.31-35.018c-14.113-50.81-62.004-54.08-70.738-54.08a74.03 74.03 0 0 0-72.238 58.916l-4.647 22.66l-13.683-53.206c-9.096-35.371-46.412-64.051-89.66-53.073a73.897 73.897 0 0 0-55.121 78.948a73.683 73.683 0 0 0-64.85 94.421l24.36 82.198c-38.24-7.545-62.797 16.183-68.116 21.847a73.68 73.68 0 0 0 3.2 104.194l91.365 85.976A154.164 154.164 0 0 0 220.622 512h107.456a127.3 127.3 0 0 0 124.261-98.139L509.962 171.9a73.203 73.203 0 0 0-8.931-55.723Zm-37.76 44.605l-57.622 241.967a79.466 79.466 0 0 1-77.57 61.26H220.623a106.34 106.34 0 0 1-73.137-28.998l-91.369-85.98c-24.773-23.303 10.494-60.899 35.28-37.49l51.122 48.107c5.426 5.109 13.483.716 13.483-5.827a246.8 246.8 0 0 0-10.178-70.152L109.811 162.13c-9.733-32.883 39.699-47.271 49.386-14.625l31.344 105.78c5.594 18.904 33.781 10.712 28.965-8.008l-42.442-165.04c-8.504-33.103 41.432-45.646 49.865-12.835l47.327 184.035c4.427 17.242 29.162 16.504 32.71-.805l31.791-154.97c6.81-33.108 57.518-24.108 50.12 11.962l-28.55 139.166c-3.722 18.11 23.669 24.631 28.057 6.217l24.801-104.146c7.965-33.348 57.955-21.063 50.086 11.921Z"
    />
  </svg>
);

export const QuestionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M10.97 8.265a1.45 1.45 0 0 0-.487.57a.75.75 0 0 1-1.341-.67c.2-.402.513-.826.997-1.148C10.627 6.69 11.244 6.5 12 6.5c.658 0 1.369.195 1.934.619a2.45 2.45 0 0 1 1.004 2.006c0 1.033-.513 1.72-1.027 2.215c-.19.183-.399.358-.579.508l-.147.123a4.329 4.329 0 0 0-.435.409v1.37a.75.75 0 1 1-1.5 0v-1.473c0-.237.067-.504.247-.736c.22-.28.486-.517.718-.714l.183-.153l.001-.001c.172-.143.324-.27.47-.412c.368-.355.569-.676.569-1.136a.953.953 0 0 0-.404-.806C12.766 8.118 12.384 8 12 8c-.494 0-.814.121-1.03.265ZM13 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"
    />
    <path
      fill="currentColor"
      d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12S5.925 1 12 1ZM2.5 12a9.5 9.5 0 0 0 9.5 9.5a9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5A9.5 9.5 0 0 0 2.5 12Z"
    />
  </svg>
);

export const RPSSLIcons = [
  RockIcon,
  PaperIcon,
  ScissorsIcon,
  LizardIcon,
  SpockIcon,
];
