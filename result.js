import { getPersonalityData } from "./personality-data.js";

const params = new URLSearchParams(window.location.search);
const code = params.get("code") || "UNKNOWN";
const tf = Number(params.get("tf") || 0);

const result = getPersonalityData(code, tf);

const resultName = document.getElementById("resultName");
const resultEnName = document.getElementById("resultEnName");
const resultImage = document.getElementById("resultImage");
const resultHighlight = document.getElementById("resultHighlight");
const resultComment = document.getElementById("resultComment");
const resultStatus = document.getElementById("resultStatus");

const copyLinkBtn = document.getElementById("copyLinkBtn");
const copyLinkBtnBottom = document.getElementById("copyLinkBtnBottom");
const shareBtn = document.getElementById("shareBtn");
const downloadImageBtn = document.getElementById("downloadImageBtn");

resultName.textContent = result.name;
resultEnName.textContent = result.enName;
resultImage.src = result.image;
resultHighlight.textContent = `「${result.highlight}」`;
resultComment.textContent = result.comment;

function setStatus(text) {
  resultStatus.textContent = text;
}

async function createResultBlob() {
  const card = document.getElementById("resultCard");
  const canvas = await html2canvas(card, {
    backgroundColor: "#f6f1fb",
    scale: 2,
    useCORS: true
  });

  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(blob), "image/png");
  });
}

async function downloadResultImage() {
  try {
    setStatus("正在生成结果图片…");
    const blob = await createResultBlob();
    if (!blob) throw new Error("结果图生成失败");
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `NKTI-${code}.png`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("结果图片已下载。");
  } catch (error) {
    setStatus("结果图片生成失败，请稍后重试。");
  }
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    setStatus("分享链接已复制。");
  } catch (error) {
    setStatus("复制失败，请手动复制地址栏链接。");
  }
}

async function shareResult() {
  try {
    setStatus("正在准备分享内容…");
    const blob = await createResultBlob();
    const file = new File([blob], `NKTI-${code}.png`, { type: "image/png" });
    const shareTitle = `我的 NKTI 结果：${result.name}`;
    const shareText = `我测出来是「${result.name}」！来做做看你的南开版 MBTI 结果吧。`;

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: window.location.href,
        files: [file]
      });
      setStatus("结果图片已调用系统分享。");
      return;
    }

    if (navigator.share) {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: window.location.href
      });
      setStatus("结果链接已调用系统分享。");
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    setStatus("当前浏览器不支持系统分享，已自动复制结果链接。");
  } catch (error) {
    if (error && error.name === "AbortError") {
      setStatus("已取消分享。");
      return;
    }
    setStatus("分享失败，请改用复制链接或下载图片。");
  }
}

copyLinkBtn.addEventListener("click", copyLink);
copyLinkBtnBottom.addEventListener("click", copyLink);
downloadImageBtn.addEventListener("click", downloadResultImage);
shareBtn.addEventListener("click", shareResult);
