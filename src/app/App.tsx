import { Toaster } from "sonner";
import { EditorialPortfolio } from "./components/EditorialPortfolio";

export default function App() {
  return (
    <>
      <EditorialPortfolio />
      <Toaster position="bottom-right" theme="light" />
    </>
  );
}
