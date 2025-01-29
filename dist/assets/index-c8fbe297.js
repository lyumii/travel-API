(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) n(r);
  new MutationObserver((r) => {
    for (const c of r)
      if (c.type === "childList")
        for (const i of c.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && n(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(r) {
    const c = {};
    return (
      r.integrity && (c.integrity = r.integrity),
      r.referrerPolicy && (c.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (c.credentials = "include")
        : r.crossOrigin === "anonymous"
        ? (c.credentials = "omit")
        : (c.credentials = "same-origin"),
      c
    );
  }
  function n(r) {
    if (r.ep) return;
    r.ep = !0;
    const c = e(r);
    fetch(r.href, c);
  }
})();
var $ = {
  photo: "https://api.pexels.com/v1/",
  video: "https://api.pexels.com/videos/",
  collections: "https://api.pexels.com/v1/collections/",
};
function l(t, o) {
  var e = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Pexels/JavaScript",
        Authorization: t,
      },
    },
    n = $[o];
  return function (r, c) {
    return fetch(
      "" +
        n +
        r +
        "?" +
        (function (i) {
          return Object.keys(i)
            .map(function (s) {
              return s + "=" + i[s];
            })
            .join("&");
        })(c || {}),
      e
    ).then(function (i) {
      if (!i.ok) throw new Error(i.statusText);
      return i.json();
    });
  };
}
function C(t) {
  var o = l(t, "collections");
  return {
    all: function (e) {
      return e === void 0 && (e = {}), o("", e);
    },
    media: function (e) {
      var n = e.id,
        r = (function (c, i) {
          if (c == null) return {};
          var s,
            a,
            p = {},
            u = Object.keys(c);
          for (a = 0; a < u.length; a++)
            i.indexOf((s = u[a])) >= 0 || (p[s] = c[s]);
          return p;
        })(e, ["id"]);
      return o("" + n, r);
    },
    featured: function (e) {
      return e === void 0 && (e = {}), o("featured", e);
    },
  };
}
function x(t) {
  return !(!t || !t.photos);
}
var k = {
  __proto__: null,
  isPhotos: x,
  isVideos: function (t) {
    return !(!t || !t.videos);
  },
  isError: function (t) {
    return !!t.error;
  },
};
function I(t) {
  var o = l(t, "photo");
  return {
    search: function (e) {
      return o("/search", e);
    },
    curated: function (e) {
      return e === void 0 && (e = {}), o("/curated", e);
    },
    show: function (e) {
      return o("/photos/" + e.id);
    },
    random: function () {
      try {
        var e = Math.floor(1e3 * Math.random());
        return Promise.resolve(this.curated({ page: e, per_page: 1 })).then(
          function (n) {
            return x(n) ? n.photos[0] : n;
          }
        );
      } catch (n) {
        return Promise.reject(n);
      }
    },
  };
}
function L(t) {
  var o = l(t, "video");
  return {
    search: function (e) {
      return o("/search", e);
    },
    popular: function (e) {
      return e === void 0 && (e = {}), o("/popular", e);
    },
    show: function (e) {
      return o("/videos/" + e.id);
    },
  };
}
function j(t) {
  if (!t || typeof t != "string")
    throw new TypeError(
      "An ApiKey must be provided when initiating the Pexel's client."
    );
  return { typeCheckers: k, photos: I(t), videos: L(t), collections: C(t) };
}
import "isomorphic-fetch";
const B = j("z4Uya3d1JQCDBHUIO06mvA5bh1YrWExKwY65AMJx1eU3dL96bSPu9d0a"),
  d = document.getElementById("destination"),
  O = document.getElementById("search");
document.getElementById("clear");
O.addEventListener("click", (t) => {
  let o = d.value;
  P(o);
});
d.addEventListener("keydown", (t) => {
  if (t.key === "Enter") {
    let o = d.value;
    P(o);
  }
});
async function P(t) {
  try {
    const o = H(t),
      e = _(t),
      n = K(t);
    return await Promise.all(o, e, n);
  } catch (o) {
    console.log("error", o);
  }
}
async function _(t) {
  const e = `https://api.weatherstack.com/current?access_key=3463a3654ba01dfc7b98e056105b25bd&query=${t}`,
    n = document.getElementById("weather");
  n.innerHTML = "";
  try {
    const r = await fetch(e);
    if (!r.ok) throw new Error("Failed to fetch");
    const c = await r.json();
    if (c.current) {
      const i = c.current.temperature,
        s = c.current.weather_descriptions,
        a = c.current.weather_icons,
        p = c.current.feelslike,
        u = c.current.humidity,
        b = c.current.wind_speed,
        T = c.current.precip,
        h = document.createElement("p");
      h.innerText = `Temperature: ${i}`;
      const f = document.createElement("p");
      f.innerText = `Weather desciption: ${s}`;
      const m = document.createElement("img");
      m.src = a;
      const y = document.createElement("p");
      y.innerText = `Feels like: ${p}`;
      const g = document.createElement("p");
      g.innerText = `Humidity: ${u}`;
      const w = document.createElement("p");
      w.innerText = `Wind Speed: ${b}`;
      const v = document.createElement("p");
      v.innerText = `Precipitation: ${T}`;
      const E = document.createElement("h2");
      (E.innerText = `The Weather in ${t} today:`),
        n.appendChild(E),
        n.appendChild(h),
        n.appendChild(f),
        n.appendChild(m),
        n.appendChild(y),
        n.appendChild(g),
        n.appendChild(w),
        n.appendChild(v);
    } else n.textContent = "Nope";
  } catch {
    console.log("Error");
  } finally {
    console.log("complete");
  }
}
async function K(t) {
  const o = document.getElementById("attractions");
  o.innerHTML = "";
  try {
    const { lat: e, lng: n } = await M(t),
      r = await A(e, n),
      c = document.createElement("h2");
    (c.innerText = `Points of Interest in ${t}`), o.appendChild(c);
    for (const i of r.features)
      if (i.properties && i.properties.formatted) {
        const s = document.createElement("div");
        (s.innerHTML = `
        <h3>${i.properties.formatted}</h3>
        <p><a href="${
          i.website ||
          `https://en.wikipedia.org/wiki/${encodeURIComponent(
            i.properties.name
          )}`
        }" target="_blank">Visit website</a></p>
        <hr>
        `),
          o.appendChild(s);
      }
    console.log(r);
  } catch (e) {
    console.log("error", e);
  }
}
async function A(t, o) {
  const n = `https://api.geoapify.com/v2/places?categories=tourism&limit=10&apiKey=6adab50e4f9f4421aabb4643494054aa&lat=${t}&lon=${o}`;
  try {
    const r = await fetch(n);
    return r.ok || console.log("didnt fetch"), r.json();
  } catch (r) {
    console.log("error", r);
  }
}
async function M(t) {
  const e = `https://api.opencagedata.com/geocode/v1/json?q=${t}&key=c9f4cfde86a74b3f81f496ef85c52936`;
  try {
    const n = await fetch(e);
    if (!n.ok) throw new Error("didnt fetch");
    const r = await n.json(),
      { lat: c, lng: i } = r.results[0].geometry;
    return { lat: c, lng: i };
  } catch (n) {
    console.log("error", n);
  }
}
async function H(t) {
  const o = t,
    e = document.getElementById("imgs");
  try {
    const n = await B.photos.search({ query: o, per_page: 3 });
    e.innerHTML = n.photos.map((r) => `<img src="${r.src.medium}">`).join("");
  } catch (n) {
    console.log("error", n);
  }
}
