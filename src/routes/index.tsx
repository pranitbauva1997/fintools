import { Title } from "@solidjs/meta";
import { For } from "solid-js";

// <p>
//   Visit the <Link href="/sip">SIP</Link> page.
// </p>
// <p>
//   Visit the <Link href="/lumpsum">Lumpsum</Link> page.
// </p>
// <p>
//   Visit the <Link href="/emi/home-loan">EMI</Link> page.
// </p>
// <p>
//   Visit the <Link href="/privacy-policy">Privacy Policy</Link> page.
// </p>
// <p>
//   Visit the <Link href="/terms-of-service">Terms of Service</Link> page.
// </p>


const calculators = [
  { name: 'SIP', path: '/sip', },
  { name: 'Lumpsum', path: '/lumpsum', },
  { name: 'EMI', path: '/emi/home-loan', },
]
export default function Home() {
  return (
    <>
      <Title>Fintools</Title>
      <h1>Financial Tools </h1>
      <For each={calculators}>
        {({ name, path }) => (
          <p>
            Visit the <a href={path}>{name}</a> page.
          </p>
        )}
      </For>
    </>
  );
}
