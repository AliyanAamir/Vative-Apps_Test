import { parentPort, workerData } from 'worker_threads';

const calculateFibonacci = (n: number): number => {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
};

const result = calculateFibonacci(workerData.num);
parentPort?.postMessage(result);
