import express, { Request, Response } from 'express';
import { Worker } from 'worker_threads';

const app = express();
const port = 3000;

const runFibonacciWorker = (num: number) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./src/worker.ts', {
      workerData: { num },
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(
          new Error(`Error Occured while executing worker message ${code}`),
        );
      }
    });
  });
};

app.get('/fibonacci/:num', async (req: Request, res: Response) => {
  const num = parseInt(req.params.num, 10);
  if (isNaN(num)) {
    return res.status(400).send('Invalid number');
  }

  try {
    const result = await runFibonacciWorker(num);

    res.status(200).json({ result });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
