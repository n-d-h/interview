# LEETCODE ALGORITHMS

### 1. Merge Sorted Array

```
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6]. The result is [1,2,2,3,5,6].
```

`Java`
```java
public void merge(int[] nums1, int m, int[] nums2, int n) {
        for (int j = 0, i = m; j < n; j++) {
            nums1[i] = nums2[j];
            i++;
        }
        Arrays.sort(nums1);
    }
```

`JavaScript`
```javascript
function merge(nums1, m, nums2, n) {
    for (let j = 0, i = m; j < n; j++) {
        nums1[i] = nums2[j];
        i++;
    }
    nums1.sort((a, b) => a - b); // Sort the merged array
}
```

### 2. Remove Element

```
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 2.
The other elements of nums are not important as the length of k is returned.
```

`Java`
```java
public int removeElement(int[] nums, int val) {
    int k = 0;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != val) {
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
}
```

`JavaScript`
```javascript
function removeElementInPlace(nums, target) {
    let k = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== target) {
            nums[k] = nums[i];
            k++;
        }
    }
    nums.length = k; // Trim the array to the new length
}

// Example usage:
const nums2 = [3, 2, 2, 3, 4, 3, 5];
removeElementInPlace(nums2, 3);

console.log(nums2); // Output: [2, 2, 4, 5]
console.log(nums2.length); // Output: 4
```

### 3. Partial Sorted Array

```
Input: nums = [5, 3, 8, 1, 9, 2, 7], k = 3
Output: [1, 3, 5, 8, 9, 2, 7]
Explanation: The first 3 elements are sorted, and the rest are not.
```

`java`
```java
public void partialSort(int[] nums, int k) {
    Arrays.sort(nums, 0, k);
}
```

`javascript`

```javascript
function partialSort(nums, k) {
    const sortedPart = nums.slice(0, k).sort((a, b) => a - b);
    return [...sortedPart, ...nums.slice(k)];
}

```

### 4. Majority Element

```
Input: nums = [2,2,1,1,1,2,2]
Output: 2
Explanation: 2 is the majority element because it appears more than n/2 times.
```

```java
public int majorityElement(int[] nums) {
        int count = 0;
        Integer candidate = null;
        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
```

### 5. Rotate Array

```
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation: Rotate the array to the right by 3 steps.
```

```java
public void rotate(int[] nums, int k) {
        k = k % nums.length;
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.length - 1);
    }

    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
```

### 6. Best Time to Buy and Sell Stock

```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
```

```java
public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int maxProfit = 0;
    for (int price : prices) {
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice > maxProfit) {
            maxProfit = price - minPrice;
        }
    }
    return maxProfit;
}
```