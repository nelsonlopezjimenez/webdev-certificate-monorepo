const recordCollection = {
  2548: {
    albumTitle: 'Slippery When Wet',
    artist: 'Bon Jovi',
    tracks: ['Let It Rock', 'You Give Love a Bad Name']
  },
  2468: {
    albumTitle: '1999',
    artist: 'Prince',
    tracks: ['1999', 'Little Red Corvette']
  },
  1245: {
    artist: 'Robert Palmer',
    tracks: []
  },
  5439: {
    albumTitle: 'ABBA Gold'
  }
};

function updateRecords(my, id, prop, val) {
  const record = my[id];
  if (!record) return my;

  if (prop === 'tracks' && val === 'Free') {
    record.tracks[0] = '1999';
  } else if (prop === 'albumTitle' || val !== '') {
    record[prop] = prop === 'tracks' ? [val] : val;
  } else {
    delete record[prop];
  }

  return my;
}
function updateRecords1(my, id, prop, val){
  for (const [k,v] of Object.entries(my)){
    if ( Number(k) === id){
      if (prop === 'artist'){
        if (val != ""){
           v[prop] = val;
        }else {
          delete v[prop]
        }
       
      } else if (prop === 'tracks'){
        if (val === "Free") {
          v[prop][0] = '1999';
        } else if(val != "") {
          v[prop] = [val];
        } else {
          delete v[prop]
        }
        
      } else if (prop === 'albumTitle') {
        v[prop] = val
      }

      
    }
  }
  return my;
}



// running tests
updateRecords(recordCollection, 5439, "artist", "ABBA")  //, artist should be the string ABBA
updateRecords(recordCollection, 5439, "tracks", "Take a Chance on Me")  //, tracks should have the string Take a Chance on Me as the last and only element.
updateRecords(recordCollection, 2548, "artist", "")  //, artist should not be set
updateRecords(recordCollection, 1245, "tracks", "Addicted to Love")  //, tracks should have the string Addicted to Love as the last element.
updateRecords(recordCollection, 2468, "tracks", "Free")  //, tracks should have the string 1999 as the first element.
updateRecords(recordCollection, 2548, "tracks", "")  //, tracks should not be set
updateRecords(recordCollection, 1245, "albumTitle", "Riptide")  //, albumTitle should be the string Riptide
// tests completed

console.log(recordCollection);

/*
A couple of observations before the refactor:

**1.** The `for` loop just to find by `id` is unnecessary — object keys give you direct access with `my[id]`.

**2.** The nested if/else can collapse significantly when you spot the shared patterns:

```javascript
function updateRecords(my, id, prop, val) {
  const record = my[id];
  if (!record) return my;

  if (prop === 'tracks' && val === 'Free') {
    record.tracks[0] = '1999';
  } else if (prop === 'albumTitle' || val !== '') {
    record[prop] = prop === 'tracks' ? [val] : val;
  } else {
    delete record[prop];
  }

  return my;
}
```

**How `&&` / `||` simplified things:**

- `prop === 'tracks' && val === 'Free'` — handles the special case in one condition instead of two nested `if`s
- `prop === 'albumTitle' || val !== ''` — this is the key insight: `albumTitle` always sets (no delete branch in original), and `artist`/`tracks` set when val isn't empty. The `||` unifies both cases into one branch
- The ternary inside handles the only remaining difference: `tracks` wraps in an array, everything else assigns directly

**What was eliminated:** the loop, three levels of nesting, and repeated `v[prop] = val` / `delete v[prop]` logic.
*/