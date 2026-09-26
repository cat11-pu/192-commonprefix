// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "左串长度 " + String(spec.left || "").length + "，右串长度 " + String(spec.right || "").length + "。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    const row = document.createElement("div");
    row.className = "row";
    const head = document.createElement("span");
    head.textContent = "公共前缀";
    row.appendChild(head);
    const mark = document.createElement("span");
    mark.className = "chip ok";
    mark.textContent = view.prefix === "" ? "（空）" : view.prefix;
    row.appendChild(mark);
    parts.stage.appendChild(row);
    const row2 = document.createElement("div");
    row2.className = "row";
    row2.textContent = "长度 " + view.length + "，首个不同位置 " + view.first_diff;
    parts.stage.appendChild(row2);
    parts.legend.textContent = "是否完全相同 " + view.same;
    parts.log.textContent = "较短长度 " + view.shortest;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "求公共前缀";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "右串加一个字符";
  addButton.addEventListener("click", function () {
    spec.right = String(spec.right || "") + "z";
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "右串去一个字符";
  dropButton.addEventListener("click", function () {
    spec.right = String(spec.right || "").slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个左串";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "abc";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { left: box.value }));
      parts.out.textContent = box.value + " 的公共前缀是 " + (view.prefix === "" ? "空" : view.prefix);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看长度";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "公共前缀长度 " + view.length + "，首个不同位置 " + view.first_diff;
  });
  parts.controls.appendChild(readButton);

  draw();
}
