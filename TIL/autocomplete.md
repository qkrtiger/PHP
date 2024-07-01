

### jquery autocomplete 충돌 문제 해결

#### 1. 기존 인스턴스 제거
```javascript
$(".autocomplete-input").autocomplete("destroy").autocomplete({
  // 새로운 옵션들...
});
```

#### 2. data 속성 사용
```html
<input type="text" data-autocomplete="true">
```

```javascript
$("input[data-autocomplete='true']").autocomplete({
  // 옵션들...
});
```

#### 3. 다른 요소에 대해 이벤트 중지 걸기
```
$("textarea").on("keydown", function(event) {
    event.stopPropagation();
});
```
