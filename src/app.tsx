import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createMemo, createSignal, Suspense } from "solid-js";
import { cssVal } from "./theme";

import './app.css';
import { Cluster } from "@xypnox/xip-ui";
import { Nav } from "./components/nav";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <style innerHTML={cssVal} />
          <Title>SolidStart - Basic</Title>
          <Nav />
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
