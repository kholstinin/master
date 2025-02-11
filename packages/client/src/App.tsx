import { Layout } from "antd";

import { Header } from "./components/Header";
import { Content } from "./components/Content";

const { Header: LayoutHeader, Content: LayoutContent } = Layout;

function App() {
  return (
    <Layout>
      <LayoutHeader className="header">
        <Header />
      </LayoutHeader>
      <LayoutContent className="content">
        <Content />
      </LayoutContent>
    </Layout>
  );
}

export default App;
