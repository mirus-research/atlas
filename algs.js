function assert(x) {
    if (!x) throw new Error('assert')
}

function swap(a, i, j) {
    const t = a[i];
    a[i] = a[j];
    a[j] = t
}

function rand(n) {
    return Math.floor(Math.random() * n)
}

function insertionSort(arr) {
    let a0 = arr.slice();
    for (let i = 1; i < a0.length; i++) {
        let k = a0[i], j = i - 1;
        while (j >= 0 && a0[j] > k) {
            a0[j + 1] = a0[j];
            j--
        }
        a0[j + 1] = k
    }
    ;
    return a0
}

function selectionSort(arr) {
    let a0 = arr.slice();
    for (let i = 0; i < a0.length; i++) {
        let m = i;
        for (let j = i + 1; j < a0.length; j++) if (a0[j] < a0[m]) m = j;
        swap(a0, i, m)
    }
    ;
    return a0
}

function bubbleSort(arr) {
    let a0 = arr.slice();
    for (let i = 0; i < a0.length; i++) for (let j = 1; j < a0.length - i; j++) if (a0[j - 1] > a0[j]) swap(a0, j - 1, j);
    return a0
}

function mergeSort(arr) {
    let a0 = arr.slice();

    function ms(x) {
        if (x.length < 2) return x;
        const m = x.length >> 1, l = ms(x.slice(0, m)), r = ms(x.slice(m));
        let i = 0, j = 0, res = [];
        while (i < l.length && j < r.length) res.push(l[i] <= r[j] ? l[i++] : r[j++]);
        return res.concat(l.slice(i), r.slice(j))
    };a0 = ms(a0);
    return a0
}

function quickSort(arr) {
    let a0 = arr.slice();

    function qs(l, h) {
        if (l >= h) return;
        const p = a0[(l + h) >> 1];
        let i = l, j = h;
        while (i <= j) {
            while (a0[i] < p) i++;
            while (a0[j] > p) j--;
            if (i <= j) {
                swap(a0, i, j);
                i++;
                j--
            }
        }
        qs(l, j);
        qs(i, h)
    };qs(0, a0.length - 1);
    return a0
}

function buildGraph(n, edges) {
    const g = Array.from({length: n}, () => []);
    for (const e of edges) {
        const [u, v, w] = e;
        g[u].push({v, w: w ?? 1});
    }
    return g
}

function bfs(g, s) {
    const q = [s], v = new Array(g.length).fill(0), o = [];
    v[s] = 1;
    while (q.length) {
        const u = q.shift();
        o.push(u);
        for (const e of g[u]) if (!v[e.v]) {
            v[e.v] = 1;
            q.push(e.v)
        }
    }
    return o
}

function dfs(g, s) {
    const v = new Array(g.length).fill(0), o = [];
    !function f(u) {
        v[u] = 1;
        o.push(u);
        for (const e of g[u]) if (!v[e.v]) f(e.v)
    }(s);
    return o
}

function dijkstra(g, s) {
    const n = g.length, dist = new Array(n).fill(1e18);
    dist[s] = 0;
    const used = new Array(n).fill(0);
    for (let it = 0; it < n; it++) {
        let u = -1;
        for (let i = 0; i < n; i++) if (!used[i] && (u == -1 || dist[i] < dist[u])) u = i;
        if (dist[u] == 1e18) break;
        used[u] = 1;
        for (const e of g[u]) if (dist[e.v] > dist[u] + e.w) dist[e.v] = dist[u] + e.w
    }
    return dist
}

class UnionFind {
    constructor(n) {
        this.p = Array.from({length: n}, (_, i) => i);
        this.r = new Array(n).fill(0)
    }

    find(x) {
        return this.p[x] == x ? x : this.p[x] = this.find(this.p[x])
    }

    union(a, b) {
        a = this.find(a);
        b = this.find(b);
        if (a == b) return false;
        if (this.r[a] < this.r[b]) this.p[a] = b; else if (this.r[a] > this.r[b]) this.p[b] = a; else {
            this.p[b] = a;
            this.r[a]++
        }
        return true
    }
}

function kruskal(n, edges) {
    edges = edges.slice().sort((a, b) => a[2] - b[2]);
    const uf = new UnionFind(n), res = [];
    for (const [e1, e2, w] of edges) if (uf.union(e1, e2)) res.push([e1, e2, w]);
    return res
}

function kmp(p) {
    const n = p.length, pi = new Array(n).fill(0);
    for (let i = 1; i < n; i++) {
        let j = pi[i - 1];
        while (j && p[i] != p[j]) j = pi[j - 1];
        if (p[i] == p[j]) j++;
        pi[i] = j
    }
    return pi
}

function kmpSearch(t, p) {
    const pi = kmp(p);
    let j = 0;
    for (let i = 0; i < t.length; i++) {
        while (j && t[i] != p[j]) j = pi[j - 1];
        if (t[i] == p[j]) j++;
        if (j == p.length) return i - j + 1
    }
    return -1
}

function zf(s) {
    const n = s.length, z = new Array(n).fill(0);
    for (let i = 1, l = 0, r = 0; i < n; i++) {
        if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1
        }
    }
    return z
}

function lis(a) {
    const t = [];
    for (const x of a) {
        let l = 0, r = t.length;
        while (l < r) {
            const m = (l + r) >> 1;
            if (t[m] < x) l = m + 1; else r = m
        }
        t[l] = x
    }
    return t.length
}

function knapsack(w, v, W) {
    const dp = new Array(W + 1).fill(0);
    for (let i = 0; i < w.length; i++) for (let j = W; j >= w[i]; j--) dp[j] = Math.max(dp[j], dp[j - w[i]] + v[i]);
    return dp[W]
}

function edit(a, b) {
    const n = a.length, m = b.length, dp = Array.from({length: n + 1}, () => new Array(m + 1).fill(0));
    for (let i = 0; i <= n; i++) dp[i][0] = i;
    for (let j = 0; j <= m; j++) dp[0][j] = j;
    for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) dp[i][j] = a[i - 1] == b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    return dp[n][m]
}

function gcd(a, b) {
    while (b) {
        [a, b] = [b, a % b]
    }
    return Math.abs(a)
}

function sieve(n) {
    const p = new Array(n + 1).fill(1);
    p[0] = p[1] = 0;
    for (let i = 2; i * i <= n; i++) if (p[i]) for (let j = i * i; j <= n; j += i) p[j] = 0;
    return p.map((v, i) => v ? i : null).filter(Boolean)
}

function bfs_only_one(g, s) {
    const q = [s], v = new Array(g.length).fill(0), o = [];
    v[s] = 1;
    while (q.length) {
        const u = q.shift();
        o.push(u);
        for (const e of g[u]) if (!v[e.v]) {
            v[e.v] = 1;
            q.push(e.v)
        }
    }
    return o
}
