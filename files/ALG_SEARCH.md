# Search Algorithms

##  1. Linear Search

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

```java
public int linearSearch(int[] arr, int x) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        if (arr[i] == x) {
            return i;
        }
    }
    return -1;
}
```

---

##  2. Binary Search

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)

```java
public int binarySearch(int[] arr, int x) {
    int left = 0;
    int right = arr.length - 1;
    while (left <= right) {
        int mid = (right + left) / 2;
        if (arr[mid] == x) {
            return mid;
        }
        if (arr[mid] < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}
```

---

##  3. Jump Search

- **Time Complexity:** O(√n)
- **Space Complexity:** O(1)

```java
public int jumpSearch(int[] arr, int x) {
    int n = arr.length;
    int step = (int) Math.floor(Math.sqrt(n));
    int prev = 0;
    while (arr[Math.min(step, n) - 1] < x) {
        prev = step;
        step += (int) Math.floor(Math.sqrt(n));
        if (prev >= n) {
            return -1;
        }
    }
    while (arr[prev] < x) {
        prev++;
        if (prev == Math.min(step, n)) {
            return -1;
        }
    }
    if (arr[prev] == x) {
        return prev;
    }
    return -1;
}
```

---

##  4. Interpolation Search

- **Time Complexity:** O(log log n) on average
- **Space Complexity:** O(1)

```java
public int interpolationSearch(int[] arr, int x) {
    int n = arr.length;
    int left = 0;
    int right = n - 1;
    while (left <= right && x >= arr[left] && x <= arr[right]) {
        if (left == right) {
            if (arr[left] == x) {
                return left;
            }
            return -1;
        }
        int pos = left + ((x - arr[left]) * (right - left) / (arr[right] - arr[left]));
        if (arr[pos] == x) {
            return pos;
        }
        if (arr[pos] < x) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }
    return -1;
}
```

---

##  5. Exponential Search

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)

```java
public int exponentialSearch(int[] arr, int x) {
    int n = arr.length;
    if (arr[0] == x) {
        return 0;
    }
    int i = 1;
    while (i < n && arr[i] <= x) {
        i = i * 2;
    }
    return Arrays.binarySearch(arr, i / 2, Math.min(i, n), x);
}
```

---

##  6. Fibonacci Search

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)

```java
public int fibonacciSearch(int[] arr, int x) {
    int n = arr.length;
    int fibMMm2 = 0;
    int fibMMm1 = 1;
    int fibM = fibMMm2 + fibMMm1;
    while (fibM < n) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
    }
    int offset = -1;
    while (fibM > 1) {
        int i = Math.min(offset + fibMMm2, n - 1);
        if (arr[i] < x) {
            fibM = fibMMm1;
            fibMMm1 = fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            offset = i;
        } else if (arr[i] > x) {
            fibM = fibMMm2;
            fibMMm1 = fibMMm1 - fibMMm2;
            fibMMm2 = fibM - fibMMm1;
        } else {
            return i;
        }
    }
    if (fibMMm1 == 1 && arr[offset + 1] == x) {
        return offset + 1;
    }
    return -1;
}
```

---

## 7. Depth First Search (DFS)

- **Time Complexity:** O(V + E)
- **Space Complexity:** O(V)

```java
public void dfs(int v, boolean[] visited, List<Integer>[] adjList) {
    visited[v] = true;
    System.out.print(v + " ");
    for (int u : adjList[v]) {
        if (!visited[u]) {
            dfs(u, visited, adjList);
        }
    }
}
```

---

## 8. Breadth First Search (BFS)

- **Time Complexity:** O(V + E)
- **Space Complexity:** O(V)

```java
public void bfs(int v, boolean[] visited, List<Integer>[] adjList) {
    Queue<Integer> queue = new LinkedList<>();
    visited[v] = true;
    queue.add(v);
    while (!queue.isEmpty()) {
        v = queue.poll();
        System.out.print(v + " ");
        for (int u : adjList[v]) {
            if (!visited[u]) {
                visited[u] = true;
                queue.add(u);
            }
        }
    }
}
```

