//SortingAlgorithms.js
//File that contains functions for each sorting algorithm

//bubbleSortAnimations function
//Parameters: input - array storing all values
//Returns: array containing a list of animations
//Does: Performs a bubble sort and adds required swap and color animations
//      to an array to visualize
export function bubbleSortAnimations(input) {
        let bubbleAnimation = []
        let length = input.length;
        let isSwapped;
        do {
                isSwapped = false;
                for (let i = 0; i < length-1; i++) {
                        if (input[i] > input[i + 1]) { 

                                //push indices to change colors
                                bubbleAnimation.push([i, i+1, 'color', 'change']);
                                bubbleAnimation.push([i, i+1, 'color', 'revert']);   
                                //push indices to swap bars 
                                bubbleAnimation.push([i, input[i+1], 'height'])
                                bubbleAnimation.push([i+1, input[i], 'height'])
                                
                                let temp = input[i];
                                input[i] = input[i + 1];
                                input[i + 1] = temp;
                                isSwapped = true;
                        }
                }
        } while (isSwapped);
        return bubbleAnimation
};

//insertionSortAnimations function
//Parameters: input - array storing all values
//Returns: array containing a list of animations
//Does: Performs an insertion sort and pushes required swap and color animations
//      to the array to visualize
export function insertionSortAnimations(input) {
        let insertionAnimation = []
        let length = input.length;
        for (let i = 1; i < length; i++) {
                let value = input[i];
                let j = i - 1;
                while (j >= 0 && input[j] > value) {
                        //push indices to swap colors
                        insertionAnimation.push([j, j+1, 'color', 'change']);
                        insertionAnimation.push([j, j+1, 'color', 'revert']);
                        //push indices to swap bars
                        insertionAnimation.push([j+1, j, 'barSwap'])
                        insertionAnimation.push([j+1, input[j], 'height']);
                        
                        input[j + 1] = input[j];
                        j--;
                }
                insertionAnimation.push([j+1, value, 'height'])
                input[j + 1] = value;
        }
        return insertionAnimation
}

//heapSortAnimation function
//Parameters: input - array storing all values
//Returns: array containing a list of animations
//Does: Performs a heap sort and pushes required swap and color animations 
//      to the array to visualize
export function heapSortAnimations(input) {
        let heapAnimation = []
        for (let i = Math.floor(input.length / 2 - 1); i >= 0; i--) {
                heapify(input, input.length, i, heapAnimation);        
        }
        for (let i = input.length - 1; i >= 0; i--) {
                
                heapSwap(input, 0, i, heapAnimation);
                heapify(input, i, 0, heapAnimation); 
        }
        return heapAnimation
}

//heapify function
//Parameters: input - array of all values
//            size - the size of the array being motified
//            i - parent element of the 'nodes' being checked
//            heapAnimation - array storing all animations
//Returns: Nothing
//Does: Ensures shape and heap invariants and performs a upheap 
//      if necessary
function heapify(input, size, i, heapAnimation) {
        let max = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        if (left < size && input[left] > input[max]) {
                max = left;
        }
        if (right < size && input[right] > input[max]) {
                max = right;
        }
        //push indices to swap colors
        heapAnimation.push([i, max, 'color', 'change']);
        heapAnimation.push([i, max, 'color', 'revert']);

        if (max !== i) {
                heapSwap(input, i, max, heapAnimation);
                heapify(input, size, max, heapAnimation);       
        }
}

//heapSwap function
//Parameters: input - the array of all values
//            first - first index being swapped
//            second - second index being swapped
//            heapAniamtion - array storing all animations
//Returns: Nothing
//Does: Swaps the values contained at the indices passed in and
//      pushes required animation to the heapAnimation array
function heapSwap(input, first, second, heapAnimation) {
        //push indices to swap bars 
        heapAnimation.push([first, second, 'height']);
        let temp = input[first];
        input[first] = input[second];
        input[second] = temp;
}

//mergeSortAnimations functions
//Parameters: array - array of all values
//Returns: array containing all animations
//Does: Performs a merge sort and pushes required swap and color animations
//      to the array to visualize
export function mergeSortAnimations(array) {
        let tempArray = Array.from(array);
        let mergeAnimation = []
        mergeSortHelper(array, 0, array.length - 1, tempArray, mergeAnimation);
        return mergeAnimation
}

//mergeSortHelper function
//Parameters: input - array of all values
//            startIndex - beginning index of the array being searched
//            endIndex - end index of array being searched
//            tempArray - second copy of array 
//            mergeAnimation - array containing all animations for merge sort
//Returns: Nothing
//Does: Recursively calls in order to get to the 'smallest' section of the array
function mergeSortHelper(input, startIndex, endIndex, tempArray, mergeAnimation) {
        if (startIndex === endIndex) {
                return;
        }
        let middleIndex = Math.floor((startIndex + endIndex) / 2);
        mergeSortHelper(tempArray, startIndex, middleIndex, input, mergeAnimation);
        mergeSortHelper(tempArray, middleIndex + 1, endIndex, input, mergeAnimation);
        mergeSortHelp(input, startIndex, middleIndex, endIndex, tempArray, mergeAnimation);
}

//mergeSortHelp function
//Parameters: input - array of all values
//            startIndex - beginning index of the array being searched
//            endIndex - end index of array being searched
//            middleIndex - the middle of the indices passed in 
//            tempArray - second copy of array
//            mergeAnimation - array containing all animations for a merge sort
//Returns: Nothing 
//Does: Performs the swapping of the merge sort and pushes all animations to the
//      mergeAnimation array
function mergeSortHelp(input, startIndex, middleIndex, endIndex, tempArray, mergeAnimation) {
        let x = startIndex, y = startIndex, z = middleIndex + 1;
        while (y <= middleIndex && z <= endIndex) {
                //push indices to swap colors
                mergeAnimation.push([y, z, 'color', 'change']);
                mergeAnimation.push([y, z, 'color', 'revert']);
                if (tempArray[y] <= tempArray[z]) {
                        //push indices to swap array bars
                        mergeAnimation.push([x, tempArray[y], 'height']);
                        input[x++] = tempArray[y++];
                } else {
                        //push indices to swap array bars
                        mergeAnimation.push([x, tempArray[z], 'height']);
                        input[x++] = tempArray[z++];
                }
        }
        while (y <= middleIndex) {
                //push indices to swap colors
                mergeAnimation.push([y, y, 'color', 'change']);
                mergeAnimation.push([y, y, 'color', 'revert']);
                //push indices to swap array bars
                mergeAnimation.push([x, tempArray[y], 'height']);
                input[x++] = tempArray[y++];
        }
        while (z <= endIndex) {
                //push indices to swap colors
                mergeAnimation.push([z, z, 'color', 'change']);
                mergeAnimation.push([z, z, 'color', 'revert']);
                //push indices to swap array bars
                mergeAnimation.push([x, tempArray[z], 'height']);
                input[x++] = tempArray[z++];
        }
}

//selectionSortAnimation function
//Parameters: input - array of all values
//Returns: array of all animations
//Does: Performs a selection sort and pushes required swap and color animations
//      to the array in order to visualize
export function selectionSortAnimations(input) {
        let selectionAnimation = []
        let length = input.length;
        for (let i = 0; i < length; i++) {
                let minimum = i;
                for (let j = i + 1; j < length; j++) {
                        //push indices to swap colors
                        selectionAnimation.push([j, minimum, 'color', 'change']);
                        selectionAnimation.push([j, minimum, 'color', 'revert']);
                        if (input[minimum] > input[j]) {
                                minimum = j;
                        }
                }
                if (minimum !== i) {
                        //push indices to swap array bars
                        selectionAnimation.push([i, input[minimum], 'height']);
                        selectionAnimation.push([minimum, input[i], 'height']);

                        let temp = input[i];
                        input[i] = input[minimum];
                        input[minimum] = temp;
                }
        }
        return selectionAnimation
}