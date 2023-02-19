## Tap

- tap() is used when we want to have a side-effect (emitting event, storing in local storage)
- Used to perform side-effects for notifications from the source observable

        1.  import { of, tap } from 'rxjs';

            const source = of(1, 2, 3, 4, 5);

            source.pipe(
            tap(n => {
                if (n > 3) {
                throw new TypeError(`Value ${ n } is greater than 3`);
                }
            })
            )
            .subscribe({ next: console.log, error: err => console.log(err.message) });


        2.  import { of, tap, map } from 'rxjs';

            of(Math.random()).pipe(
            tap(console.log),
            map(n => n > 0.5 ? 'big' : 'small')
            ).subscribe(console.log);

## combineLatest

- Whenever any input Observable emits a value, it computes a formula using the latest values from all the inputs, then emits the output of that formula.

        1.  import { timer, combineLatest } from 'rxjs';

            const firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
            const secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
            const combinedTimers = combineLatest([firstTimer, secondTimer]);
            combinedTimers.subscribe(value => console.log(value));
            // Logs
            // [0, 0] after 0.5s
            // [1, 0] after 1s
            // [1, 1] after 1.5s
            // [2, 1] after 2s


        2.  import { timer, combineLatest } from 'rxjs';

            const firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
            const secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
            const combinedTimers = combineLatest([firstTimer, secondTimer]);
            combinedTimers.subscribe(value => console.log(value));
            // Logs
            // [0, 0] after 0.5s
            // [1, 0] after 1s
            // [1, 1] after 1.5s
            // [2, 1] after 2s

        3.  import { of, delay, startWith, combineLatest } from 'rxjs';

            const observables = [1, 5, 10].map(
            n => of(n).pipe(
                delay(n * 1000), // emit 0 and then emit n after n seconds
                startWith(0)
            )
            );
            const combined = combineLatest(observables);
            combined.subscribe(value => console.log(value));
            // Logs
            // [0, 0, 0] immediately
            // [1, 0, 0] after 1s
            // [1, 5, 0] after 5s
        // [1, 5, 10] after 10s
