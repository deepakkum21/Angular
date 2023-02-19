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
