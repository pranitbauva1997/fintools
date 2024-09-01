import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { cssVal } from "./theme";

import './app.css';

import { Cluster, Stack } from "@xypnox/xip-ui";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <style innerHTML={cssVal} />
          <Title>SolidStart - Basic</Title>
          <Cluster style={{ padding: '1em' }}>
            <a href="/">Tools</a>
            <a href="/lumpsum">Lumpsum</a>
            <a href="/emi/home-loan">EMI</a>
            <a href="/sip/">SIP</a>
            <a href="/about">About</a>
          </Cluster>
          <main>
            <Suspense>
              {props.children}
            </Suspense>
          </main>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
