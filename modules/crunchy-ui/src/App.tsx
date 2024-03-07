import './styles/App.css';
import { Header } from './components/Header';
import { useMemo } from 'react';
import { getRoutes } from './App.routes';
import { RouteConfigRenderer } from './routing/RouteConfigRenderer';

export const App = () => {

  const routes = useMemo(() => getRoutes(), []);

  return (
    <div className="App">
      <Header routes={routes}/>
      <RouteConfigRenderer routes={routes}/>
    </div>
  );
}
