/**
    Test: Mountain Number
    autor: Sabrina Kay Sproviero
*/

const isValidTest = (arrTest) => {

    if (arrTest.length === undefined) {
        return false;
    }

//check pow
    if (arrTest.length < 3) {
        console.log(arrTest.length,'here')
        return false;
    }

    return true;
}

const checkMountain = (arr) => {
    // divide array check if the end and begin is equal.

    if(!isValidTest(arr)) {
        console.log(false);
        return false;
    }


    const FIRST_STEP = arr[0];
    const LAST_STEP = arr[arr.length - 1]

    if (FIRST_STEP !== LAST_STEP) {
        console.log(false);
        return false;
    }

    let previus_mountain = arr[0];

    for (let i = 1; i < (arr.length - 1); i++) {
        if (typeof arr[i] != 'number') {
            console.log(false);
            return false;
        }
        if (arr[i] % 1 !== 0) {
            console.log(false);
            return false;
        }

        if (previus_mountain < arr[i] || (previus_mountain > arr[i] && arr[i] > arr[i+1])) {

            if (Math.abs(arr[i] - previus_mountain) == 1) {
                previus_mountain = arr[i];
                continue;
            } else {
                console.log(false);
                return false;
            }
            
        }
        console.log(false);
        return false;
    }

    console.log(true);

}
checkMountain([0, 1, 2, 1, 0]); console.log('correct is TRUE');
checkMountain([1, 2, 1]); console.log('correct is TRUE');
checkMountain([0, 1, 2, 2, 1, 0]); console.log('correct is FALSE');
checkMountain([0, 1, 4, 2, 3, 1]); console.log('correct is FALSE');
checkMountain([0, 1, 2, 2, 4, 1]); console.log('correct is FALSE');
checkMountain([0, 1, 4, 2, 2, 1]); console.log('correct is FALSE');
checkMountain([0, 1, 4]); console.log('correct is FALSE');
checkMountain([0, 1, 1]); console.log('correct is FALSE');
checkMountain([4, 1, 0]); console.log('correct is FALSE');
checkMountain([1, 1, 0]); console.log('correct is FALSE');
checkMountain([0, 1, 4, 2, 3]); console.log('correct is FALSE');
checkMountain([3, 2, 4, 1, 0]); console.log('correct is FALSE');
checkMountain([-1, 0, 2, 0]); console.log('correct is FALSE');
checkMountain([0, 1, 100000, 1, 0]); console.log('correct is FALSE');
checkMountain([0, 1, 10.1, 1, 0]); console.log('correct is FALSE');
checkMountain(['0', '1', '10', '1', '0']); console.log('correct is FALSE');
checkMountain(12321); console.log('correct is FALSE');
checkMountain('12321'); console.log('correct is FALSE');