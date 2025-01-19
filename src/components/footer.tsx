import { useSummarizeStore } from '@/services/store/use-summarize-store.ts';
import { useMemo } from 'react';

const Footer = () => {
  const summaries = useSummarizeStore((state) => state.summaries);

  const stats = useMemo(() => {
    return summaries.reduce(
      (acc, summary) => {
        acc.articleSummarized += 1;
        acc.timeSaved += summary.timeSaved;
        acc.tokenUsed += summary.tokens;

        return acc;
      },
      {
        timeSaved: 0,
        articleSummarized: 0,
        tokenUsed: 0,
      }
    );
  }, [summaries]);

  return (
    <div className="flex justify-around border-t pt-2 text-xs text-gray-300">
      <div>Time saved: {stats.timeSaved} min</div>
      <div>Articles summarized: {stats.articleSummarized}</div>
      <div>Tokens used: {stats.tokenUsed}</div>
    </div>
  );
};

export default Footer;
