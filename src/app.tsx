import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createMemo, createSignal, Suspense } from "solid-js";
import { cssVal } from "./theme";

import './app.css';

import PhSunDuotone from '~icons/ph/sun-duotone';
import PhMoonDuotone from '~icons/ph/moon-duotone';

import { Button, Cluster } from "@xypnox/xip-ui";
import { isServer } from "solid-js/web";

const currentTheme = () => {
  if (isServer) return "dark";
  const body = document.body;
  const localTheme = localStorage.getItem("xip-theme");
  if (localTheme) {
    body.classList.add(localTheme === "dark" ? "dark-mode" : "light-mode");
    return localTheme;
  }
  if (body.classList.contains("dark-mode")) {
    return "dark";
  } else if (body.classList.contains("light-mode")) {
    return "light";
  } else {
    const userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
    return userTheme;
  }
};

const Switcher = () => {
  const [cur, setCur] = createSignal(currentTheme());
  const switchTheme = () => {
    const current = currentTheme();
    const body = isServer ? undefined : document.body;
    // console.log(current);

    if (current === "dark") {
      body?.classList.add("no-transition");
      body?.classList.remove("dark-mode");
      body?.classList.add("light-mode");
      setTimeout(() => body?.classList.remove("no-transition"), 1000);
      localStorage.setItem("xip-theme", "light");
      setCur("light");
    } else {
      body?.classList.add("no-transition");
      body?.classList.remove("light-mode");
      body?.classList.add("dark-mode");
      setTimeout(() => body?.classList.remove("no-transition"), 1000);
      localStorage.setItem("xip-theme", "dark");
      setCur("dark");
    }
  }

  return (
    <Button onClick={switchTheme} class="switcher">
      {cur() === "dark" ? <PhSunDuotone /> : <PhMoonDuotone />}
    </Button>
  )
}

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <style innerHTML={cssVal} />
          <Title>SolidStart - Basic</Title>
          <nav>
            <Cluster>
              <a href="/lumpsum">Lumpsum</a>
              <a href="/emi/home-loan">EMI</a>
              <a href="/sip/">SIP</a>
            </Cluster>
            <Switcher />
          </nav>
          <main>
            <Suspense>
              {props.children}
            </Suspense>
          </main>
          <footer>
            <Cluster>
              <p>
                Built by <a href="https://bauva.com" target="_blank" rel="noopener noreferrer">Bauva</a>{' '}
                & <a target="_blank" rel="noopener noreferrer" href="https://www.xypnox.com">xypnox</a>
              </p>
            </Cluster>
            <Cluster>
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms-of-service">Terms of Service</a>
            </Cluster>
          </footer>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
