/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        // 커스텀 커서 이름: 'buttonCursor'와 'defaultCursor'를 추가
        buttonCursor: 'url(/cursor/buttonCursor.png), pointer', // 버튼용 커서
        defaultCursor: 'url(/cursor/defaultCursor.png), auto', // 기본용 커서
      },
    },
  },
  plugins: [],
}

