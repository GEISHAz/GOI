export default function ChattingSelector () {
  return (
    <ul >
      {
        Array(4).fill('').map((li, i) => (
          <li onClick={() => console.log(`Dropdown${i + 1}`)}>Dropdown{i + 1}</li>
        ))
      }
    </ul>
  )
};