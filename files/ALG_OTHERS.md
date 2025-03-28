# Additional Algorithms

## 1. Tìm số nguyên tố

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(1)

```java
public boolean isPrime(int n) {
    if (n <= 1) {
        return false;
    }
    for (int i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}
```

---

## 2. Tìm số Fibonacci

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(1)

```java
public int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}
```

--

## 3. Tìm giai thừa

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(1)

```java
public int factorial(int n) {
    if (n == 0) {
        return 1;
    }
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

---

## 4. Hoán vị

- **Độ phức tạp thời gian:** O(n!)
- **Độ phức tạp không gian:** O(n)

```java
public void permute(String str, int l, int r) {
    if (l == r) {
        System.out.println(str);
    } else {
        for (int i = l; i <= r; i++) {
            str = swap(str, l, i);
            permute(str, l + 1, r);
            str = swap(str, l, i);
        }
    }
}
```

---

## 5. Đảo ngược mảng

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(1)

```java
public void reverseArray(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[n - i - 1];
        arr[n - i - 1] = temp;
    }
}
```

---

## 6. Đảo ngược chuỗi

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(n)

```java
public String reverseString(String str) {
    char[] chars = str.toCharArray();
    int n = chars.length;
    for (int i = 0; i < n / 2; i++) {
        char temp = chars[i];
        chars[i] = chars[n - i - 1];
        chars[n - i - 1] = temp;
    }
    return new String(chars);
}
```

---

## 7. Làm phẳng mảng

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(n)

`java`

```java
public List<Integer> flattenArray(Object[] arr) {
    List<Integer> result = new ArrayList<>();
    for (Object obj : arr) {
        if (obj instanceof Integer) {
            result.add((Integer) obj);
        } else if (obj instanceof Object[]) {
            result.addAll(flattenArray((Object[]) obj));
        }
    }
    return result;
}
```

`javascript`

```javascript
function flattenArray(arr) {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val),
    []
  );
}
```

---

## 8. Tìm các phần tử trùng lặp

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(n)

`java`

```java
public List<Integer> findDuplicates(int[] arr) {
    List<Integer> result = new ArrayList<>();
    Set<Integer> set = new HashSet<>();
    for (int num : arr) {
        if (!set.add(num)) {
            result.add(num);
        }
    }
    return result;
}
```

`javascript`

```javascript
function findDuplicates(arr) {
  let result = [];
  let set = new Set();
  for (let num of arr) {
    if (set.has(num)) {
      result.push(num);
    } else {
      set.add(num);
    }
  }
  return result;
}
```

## 8.1 Đếm số lần xuất hiện của các phần tử

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(n)

`java`

```java
public Map<Integer, Integer> countOccurrences(int[] arr) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int num : arr) {
        map.put(num, map.getOrDefault(num, 0) + 1);
    }
    return map;
}
```

`javascript`

```javascript
function countOccurrences(arr) {
  let map = new Map();
  for (let num of arr) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  return map;
}
```

---

## 9. Loại bỏ phần tử trùng

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(n)

`java`

```java
public int[] removeDuplicates(int[] arr) {
    Set<Integer> set = new HashSet<>();
    for (int num : arr) {
        set.add(num);
    }
    int[] result = new int[set.size()];
    int i = 0;
    for (int num : set) {
        result[i++] = num;
    }
    return result;
}
```

`javascript`

```javascript
function removeDuplicates(arr) {
  return Array.from(new Set(arr));
}
```

---

## 10. Tìm các kí tự xuất hiện nhiều nhất

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(n)

`java`

```java
public List<Character> findMostFrequentChars(String str) {
    Map<Character, Integer> map = new HashMap<>();
    for (char c : str.toCharArray()) {
        map.put(c, map.getOrDefault(c, 0) + 1);
    }
    int max = Collections.max(map.values());
    List<Character> result = new ArrayList<>();
    for (Map.Entry<Character, Integer> entry : map.entrySet()) {
        if (entry.getValue() == max) {
            result.add(entry.getKey());
        }
    }
    return result;
}
```

`javascript`

```javascript
function findMostFrequentChars(str) {
  let map = new Map();
  for (let c of str) {
    map.set(c, (map.get(c) || 0) + 1);
  }
  let max = Math.max(...map.values());
  let result = [];
  for (let [key, value] of map) {
    if (value === max) {
      result.push(key);
    }
  }
  return result;
}
```

---

## 11. Tìm các kí tự trùng lặp trong chuỗi

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(n)

`java`

```java
public List<Character> findDuplicateChars(String str) {
    Set<Character> set = new HashSet<>();
    Set<Character> result = new HashSet<>();
    for (char c : str.toCharArray()) {
        if (!set.add(c)) {
            result.add(c);
        }
    }
    return new ArrayList<>(result);
}
```

`javascript`

```javascript
function findDuplicateChars(str) {
  let set = new Set();
  let result = new Set();
  for (let c of str) {
    if (set.has(c)) {
      result.add(c);
    } else {
      set.add(c);
    }
  }
  return Array.from(result);
}
```

---

## 12 Loại bỏ các kí tự trùng lặp trong chuỗi

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(n)

`java`

```java
public String removeDuplicateChars(String str) {
    Set<Character> set = new HashSet<>();
    StringBuilder sb = new StringBuilder();
    for (char c : str.toCharArray()) {
        if (set.add(c)) {
            sb.append(c);
        }
    }
    return sb.toString();
}
```

`javascript`

```javascript
function removeDuplicateChars(str) {
  let set = new Set();
  let result = "";
  for (let c of str) {
    if (set.add(c)) {
      result += c;
    }
  }
  return result;
}
```

---

## 13. Tìm số lớn thứ hai

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(1)

`java`

```java
public int findSecondLargest(int[] arr) {
    int first = Integer.MIN_VALUE;
    int second = Integer.MIN_VALUE;
    for (int num : arr) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num != first) {
            second = num;
        }
    }
    return second;
}
```

`javascript`

```javascript
function findSecondLargest(arr) {
  let first = Number.MIN_SAFE_INTEGER;
  let second = Number.MIN_SAFE_INTEGER;
  for (let num of arr) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num !== first) {
      second = num;
    }
  }
  return second;
}
```

---

## 14. Tìm số lớn nhất

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(1)

`java`

```java
public int findLargest(int[] arr) {
    int max = Integer.MIN_VALUE;
    for (int num : arr) {
        max = Math.max(max, num);
    }
    return max;
}
```

`javascript`

```javascript
function findLargest(arr) {
  return Math.max(...arr);
}
```

---

## 15. Tìm số bị thiếu trong mảng đã sắp xếp

- **Độ phức tạp thời gian:** O(log n)
- **Độ phức tạp không gian:** O(1)

`java`

```java
public int findMissingNumber(int[] arr) {
    int n = arr.length;
    int left = 0;
    int right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == mid) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
}
```

`javascript`

```javascript
function findMissingNumber(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === mid) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}
```

---

## 16. Tìm số lớn nhất nhỏ hơn x

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(1)

`java`

```java
public int findLargestLessThanX(int[] arr, int x) {
    int max = Integer.MIN_VALUE;
    for (int num : arr) {
        if (num < x) {
            max = Math.max(max, num);
        }
    }
    return max;
}
```

`javascript`

```javascript
function findLargestLessThanX(arr, x) {
  let max = Number.MIN_SAFE_INTEGER;
  for (let num of arr) {
    if (num < x) {
      max = Math.max(max, num);
    }
  }
  return max;
}
```

---

## 17. Tìm các tập hợp số có tổng bằng một số cho trước

- **Độ phức tạp thời gian:** O(2^n)
- **Độ phức tạp không gian:** O(n)

`java`

```java
public List<List<Integer>> findSubsetsWithSum(int[] arr, int sum) {
    List<List<Integer>> result = new ArrayList<>();
    findSubsetsWithSum(arr, sum, 0, new ArrayList<>(), result);
    return result;
}

private void findSubsetsWithSum(
    int[] arr,
    int sum,
    int index,
    List<Integer> current,
    List<List<Integer>> result
) {
    if (sum == 0) {
        result.add(new ArrayList<>(current));
        return;
    }
    if (sum < 0 || index == arr.length) {
        return;
    }
    current.add(arr[index]);
    findSubsetsWithSum(arr, sum - arr[index], index + 1, current, result);
    current.remove(current.size() - 1);
    findSubsetsWithSum(arr, sum, index + 1, current, result);
}
```

---

## 18. Tìm cặp số có tổng nhỏ hơn hoặc bằng một số cho trước

- **Độ phức tạp thời gian:** O(n log n)
- **Độ phức tạp không gian:** O(1)

`java`

```java
public List<int[]> findPairsWithSum(int[] arr, int sum) {
    List<int[]> result = new ArrayList<>();
    Arrays.sort(arr);
    int left = 0;
    int right = arr.length - 1;
    while (left < right) {
        if (arr[left] + arr[right] <= sum) {
            result.add(new int[]{arr[left], arr[right]});
            left++;
        } else {
            right--;
        }
    }
    return result;
}
```

`javascript`

```javascript
function findPairsWithSum(arr, sum) {
  arr.sort((a, b) => a - b);
  let left = 0;
  let right = arr.length - 1;
  let result = [];
  while (left < right) {
    if (arr[left] + arr[right] <= sum) {
      result.push([arr[left], arr[right]]);
      left++;
    } else {
      right--;
    }
  }
  return result;
}
```

## 18.1 Tìm cặp số có tổng bằng một số cho trước

- **Độ phức tạp thời gian:** O(n)
- **Độ phức tạp không gian:** O(n)

`java`

```java
public List<int[]> findPairsWithSum(int[] arr, int sum) {
    List<int[]> result = new ArrayList<>();
    Map<Integer, Integer> map = new HashMap<>();
    for (int num : arr) {
        if (map.containsKey(sum - num)) {
            result.add(new int[]{num, sum - num});
        }
        map.put(num, map.getOrDefault(num, 0) + 1);
    }
    return result;
}
```

`javascript`

```javascript
function findPairsWithSum(arr, sum) {
  let result = [];
  let map = new Map();
  for (let num of arr) {
    if (map.has(sum - num)) {
      result.push([num, sum - num]);
    }
    map.set(num, (map.get(num) || 0) + 1);
  }
  return result;
}
```

## 19. Đổi chiều ngang và chiều dọc của ma trận

- **Độ phức tạp thời gian:** O(n \* m)
- **Độ phức tạp không gian:** O(1)

`java`

```java
public int[][] transposeMatrix(int[][] matrix) {
    int m = matrix.length;
    int n = matrix[0].length;
    int[][] result = new int[n][m];
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            result[j][i] = matrix[i][j];
        }
    }
    return result;
}
```

`javascript`

```javascript
function transposeMatrix(matrix) {
  let m = matrix.length;
  let n = matrix[0].length;
  let result = Array.from({ length: n }, () => Array(m).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      result[j][i] = matrix[i][j];
    }
  }
  return result;
}
```
