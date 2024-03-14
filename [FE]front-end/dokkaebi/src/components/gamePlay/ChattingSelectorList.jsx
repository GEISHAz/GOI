export default function ChattingSelector () {
  return (
    <ul>
      {
        Array.from(Array(3), (_, i) => i).map((li, i) => (
          <li onClick={() => console.log(`Dropdown${3 - i}`)}>Dropdown{3 - i}</li>
        ))
      }
    </ul>
  )
};