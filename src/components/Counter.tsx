import { createSignal } from "solid-js";
import { Button } from "@xypnox/xip-ui";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <Button onClick={() => setCount(count() + 1)} type="button">
      Clicks: {count()}
    </Button>
  );
}
