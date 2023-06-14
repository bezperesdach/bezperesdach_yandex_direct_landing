interface Window {
  gtag: UniversalAnalytics.ga | undefined;
  ym: (id: number, goal: string, goalName: string) => void;
}
