import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TooltipProvider } from './components/ui/tooltip';
import './App.css';
import EditorDebugPage from './pages/EditorDebugPage';
import EditorPage from './pages/EditorPage';
import Home from './pages/Home';
import TestPage from './pages/TestPage';

const App = () => (
  <TooltipProvider delayDuration={0} skipDelayDuration={0}>
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<EditorPage />} path="/editor" />
        <Route element={<TestPage />} path="/test" />
        <Route element={<EditorDebugPage />} path="/debug" />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
