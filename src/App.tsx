import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/header.tsx';
import Footer from '@/components/footer.tsx';
import Main from '@/components/main.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-[430px] max-h-[430px] w-[600px] min-w-[600px] max-w-[600px] flex-col justify-between bg-primary/10 pb-2 text-foreground">
        <Header />
        <Main />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
