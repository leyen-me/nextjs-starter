import { useSession } from "next-auth/react"
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <Button>Button</Button>
    </main>
  );
}
