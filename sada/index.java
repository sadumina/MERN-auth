class Counter {

    private Object lock;
    private int count = 0;

    public synchronized void increment(lock) {
        count++;
        System.out.println("Incremented count to: " + count);
        notify(); // Notify the waiting thread
    }

    public synchronized void waitForEven() throws InterruptedException {
        while (count % 2 != 0) {
            System.out.println("Waiting for count to be even...");
            wait(); // Wait until notified
        }
        System.out.println("Count is even: " + count);
    }
}

class Incrementer extends Thread {
    private Counter counter;

    public Incrementer(Counter counter) {
        this.counter = counter;
    }

    public void run() {
        for (int i = 0; i < 5; i++) {
            counter.increment();
            try {
                Thread.sleep(500); // Simulate some work
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

class EvenChecker extends Thread {
    private Counter counter;

    public EvenChecker(Counter counter) {
        this.counter = counter;
    }

    public void run() {
        for (int i = 0; i < 5; i++) {
            try {
                counter.waitForEven();
                Thread.sleep(500); // Simulate some work
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Counter counter = new Counter();

        Incrementer incrementer = new Incrementer(counter);
        EvenChecker evenChecker = new EvenChecker(counter);

        incrementer.start();
        evenChecker.start();
    }
}
