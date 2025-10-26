export function setupPanels(){
  document.body.innerHTML=`
    <div id="sidebar">
      <button id="btn-scene">Cena</button>
      <button id="btn-assets">Assets</button>
      <button id="btn-script">Script</button>
    </div>
    <div id="mainPanel">
      <canvas id="gameCanvas" width="960" height="540"></canvas>
    </div>
    <div id="rightPanel"><h3>Propriedades</h3><div id="properties"></div></div>
  `;
}
