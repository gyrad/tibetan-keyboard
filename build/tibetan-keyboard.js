let input = document.querySelector('#tibetan-input'),
  copyBtn = document.querySelector('.copy-btn'),
  spaceBtn = document.querySelector('.space-btn'),
  debug = document.querySelector('#debug'),
  inputVal,
  replacer,
  delayer,
  copyBtnTimer,
  cursorPosition;

input.focus();

input.addEventListener('input', () => replacer());

copyBtn.addEventListener('click', () => {
  clearTimeout(copyBtnTimer);
  input.select();
  document.execCommand('copy');
  copyBtn.innerText = '✔ Copied!';
  copyBtn.classList.add('is-success');
  copyBtnTimer = setTimeout(() => {
    copyBtn.innerText = 'Copy';
    copyBtn.classList.remove('is-success');
  }, 3000);
});

spaceBtn.addEventListener('click', () => {
  input.value += '\u2008';
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
});

replacer = () => {
  cursorPosition = input.selectionEnd;
  inputVal = input.value;

  delayer = (regex, print, stall) => {
    if (regex.test(inputVal)) {
      setTimeout(
        () => {
          inputVal = inputVal.replace(regex, print);
          input.value = inputVal;
        },
        stall ? 1000 : 500
      );
    }
  };

  // consonants
  inputVal = inputVal.replace(/k/g, 'ཀ');
  inputVal = inputVal.replace(/g/g, 'ག');
  inputVal = inputVal.replace(/c/g, 'ཅ');
  inputVal = inputVal.replace(/j/g, 'ཇ');
  inputVal = inputVal.replace(/t/g, 'ཏ');
  inputVal = inputVal.replace(/d/g, 'ད');
  // Special case: I have delayed n since ng can form ང་ and also syllable ནག་ unlike the other simple consonant combinations.
  delayer(/n/g, 'ན');
  inputVal = inputVal.replace(/p/g, 'པ');
  inputVal = inputVal.replace(/b/g, 'བ');
  inputVal = inputVal.replace(/m/g, 'མ');
  inputVal = inputVal.replace(/w/g, 'ཝ');
  inputVal = inputVal.replace(/z/g, 'ཟ');
  inputVal = inputVal.replace(/\u0027/g, 'འ');
  inputVal = inputVal.replace(/y/g, 'ཡ');
  inputVal = inputVal.replace(/r/g, 'ར');
  inputVal = inputVal.replace(/l/g, 'ལ');
  inputVal = inputVal.replace(/s/g, 'ས');
  inputVal = inputVal.replace(/h/g, 'ཧ');
  inputVal = inputVal.replace(/a/g, 'ཨ');
  // Below doesn't work on Android since tapping spacebar
  // twice attempts to output a period + space, so I've disabled it.
  // inputVal = inputVal.replace(/་་/g, '\u2008');
  inputVal = inputVal.replace(/ /g, '་');
  inputVal = inputVal.replace(/\//g, '།');
  inputVal = inputVal.replace(/\./g, '།');
  inputVal = inputVal.replace(/སཧ/g, 'ཤ');
  inputVal = inputVal.replace(/ཀཧ/g, 'ཁ');
  inputVal = inputVal.replace(/nག/g, 'ང');
  inputVal = inputVal.replace(/ཅཧ/g, 'ཆ');
  inputVal = inputVal.replace(/nཡ/g, 'ཉ');
  inputVal = inputVal.replace(/ཏཧ/g, 'ཐ');
  inputVal = inputVal.replace(/པཧ/g, 'ཕ');
  inputVal = inputVal.replace(/ཏས/g, 'ཙ');
  inputVal = inputVal.replace(/ཙཧ/g, 'ཚ');
  inputVal = inputVal.replace(/དཟ/g, 'ཛ');
  inputVal = inputVal.replace(/ཟཧ/g, 'ཞ');

  // vowels
  inputVal = inputVal.replace(/([\u0F00-\u0FFF])i/gu, '$1\u0F72');
  inputVal = inputVal.replace(/([\u0F00-\u0FFF])u/gu, '$1\u0F74');
  inputVal = inputVal.replace(/([\u0F00-\u0FFF])e/gu, '$1\u0F7A');
  inputVal = inputVal.replace(/([\u0F00-\u0FFF])o/gu, '$1\u0F7C');

  // These initial English letters can form more Tibetan characters so they are a bit delayed.
  delayer(/([རལས])K/g, '$1\u0F90');
  delayer(/([རལས])C/g, '$1\u0F95');
  delayer(/([རལས])D/g, '$1\u0FA1');
  delayer(/([རལས])N/g, '$1\u0FA3');
  delayer(/([རལས])P/g, '$1\u0FA4');
  // T is delayed even longer since it can be used to form the 3 Tibetan characters: ཏ་ཙ་ཚ། T, TS & TSH
  delayer(/([རལས])T/g, '$1\u0F9F', true);
  delayer(/([རལས])TS/g, '$1\u0FA9');
  delayer(/([རལས])Z/g, '$1\u0FAF');
  delayer(/([རལས])S/g, '$1\u0FB6');
  inputVal = inputVal.replace(/([རལས])KH/g, '$1\u0F91');
  inputVal = inputVal.replace(/([རལས])G/g, '$1\u0F92');
  inputVal = inputVal.replace(/([རལས])NG/g, '$1\u0F94');
  inputVal = inputVal.replace(/([རལས])CH/g, '$1\u0F96');
  inputVal = inputVal.replace(/([རལས])J/g, '$1\u0F97');
  inputVal = inputVal.replace(/([རལས])NY/g, '$1\u0F99');
  inputVal = inputVal.replace(/([རལས])TH/g, '$1\u0FA0');
  inputVal = inputVal.replace(/([རལས])PH/g, '$1\u0FA5');
  inputVal = inputVal.replace(/([རལས])B/g, '$1\u0FA6');
  inputVal = inputVal.replace(/([རལས])M/g, '$1\u0FA8');
  inputVal = inputVal.replace(/([རལས])TSH/g, '$1\u0FAA');
  inputVal = inputVal.replace(/([རལས])DZ/g, '$1\u0FAB');
  inputVal = inputVal.replace(/([རལས])ZH/g, '$1\u0FAE');
  inputVal = inputVal.replace(/([རལས])"/g, '$1\u0FB0');
  inputVal = inputVal.replace(/([རལས])SH/g, '$1\u0FB4');
  inputVal = inputVal.replace(/([རལས])H/g, '$1\u0FB7');
  inputVal = inputVal.replace(/([རལས])A/g, '$1\u0FB8');

  // root + subscript
  inputVal = inputVal.replace(/([\u0F00-\u0FFF])Y/g, '$1\u0FB1');
  inputVal = inputVal.replace(/([\u0F00-\u0FFF])R/g, '$1\u0FB2');
  inputVal = inputVal.replace(/([\u0F00-\u0FFF])L/g, '$1\u0FB3');
  inputVal = inputVal.replace(/([\u0F00-\u0FFF])W/g, '$1\u0FAD');

  // numbers
  inputVal = inputVal.replace(/1/g, '༡');
  inputVal = inputVal.replace(/2/g, '༢');
  inputVal = inputVal.replace(/3/g, '༣');
  inputVal = inputVal.replace(/4/g, '༤');
  inputVal = inputVal.replace(/5/g, '༥');
  inputVal = inputVal.replace(/6/g, '༦');
  inputVal = inputVal.replace(/7/g, '༧');
  inputVal = inputVal.replace(/8/g, '༨');
  inputVal = inputVal.replace(/9/g, '༩');
  inputVal = inputVal.replace(/0/g, '༠');

  input.value = inputVal;
  input.focus();
  input.setSelectionRange(cursorPosition, cursorPosition);
};
