export class AssetLoader {
  static async loadTexture(url){ const img=new Image(); img.src=url; await img.decode(); return {image:img}; }
  static async loadModel(url){ const res=await fetch(url); return await res.text(); }
}
