
    let input = document.querySelector('#input');
    let btn = document.querySelector('#search-btn');
    let result = document.querySelector('#display');

    const fetchDefinition = async () => {
      try {
        let user = input.value
        let api = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + user)
        if (!api.ok) {
          console.log("api have some issues")
          return;
        }
        const got = await api.json();
        let response = got[0].word
        let word = response.toUpperCase();
        let pos = got[0].meanings[0].partOfSpeech
        let r = got[0].meanings[0].definitions[0].definition
        let ex = got[0].meanings[0].definitions[0].example

        if (ex !== undefined) {
          result.innerHTML = `<strong>${word}</strong> <br> <strong>Part of Speech:</strong> ${pos} <br> <strong>definition:</strong> ${r} <br> <strong>Ex:</strong> ${ex}`
        }
        else {
          result.innerHTML = `<strong>${word}</strong> <br> <strong>Part of Speech:</strong> ${pos} <br> <strong>definition:</strong> ${r}`
        }

      } catch (e) {
        console.log(e)
      }
    };


    btn.addEventListener('click', fetchDefinition);