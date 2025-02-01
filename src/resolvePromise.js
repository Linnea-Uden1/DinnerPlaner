export function resolvePromise(promise, promiseState){

    // Om inget promise skickas, återställs promiseState
    if (!promise) {
        promiseState.promise = null;
        promiseState.data = null;
        promiseState.error = null;
        return;
    }

    // Sätt promise som är aktuellt
    promiseState.promise = promise;
    promiseState.data = null;  // Sätt data till null innan resultatet
    promiseState.error = null; // Sätt fel till null innan något fel

    // Callback-funktion för när promise lyckas (success)
    function successACB(result){
        // Kontrollera att det aktuella promise är samma som det vi skickade
        if(promiseState.promise === promise)
            promiseState.data = result; // Sätt resultatet i promiseState
    }

    // Callback-funktion för när promise misslyckas (failure)
    function failureACB(error){
        // Kontrollera att det aktuella promise är samma som det vi skickade
        if(promiseState.promise === promise)
            promiseState.error = error; // Sätt felet i promiseState
    }

    // När promise löses (antingen success eller failure) ska respektive callback anropas
    promise.then(successACB).catch(failureACB);
}
