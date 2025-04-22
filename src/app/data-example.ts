export interface Producto {
  id: number;
  sku: string;
  nombre: string;
  marca: string;
  img: string;
  stock: number;
  precio: number;
}

export const productos: Producto[] = [
  {
    id: 1,
    sku: "7754221008675",
    nombre: "PLUMONES GRUESOS VK-47 X 6 UNID -VIKINGO",
    marca: "VIKINGO",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/c/o/colores-triangulares-cortos-x-12-sacapunta-artesco-1923-default-1.jpg",
    stock: 0,
    precio: 5.99
  },
  {
    id: 2,
    sku: "7754807772495",
    nombre: "PLUMONES GRUESOS SUPER JUMBO 47 ESTX12 VINIFAN",
    marca: "VINIFAN",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/p/l/plumon-vinifan-420-best-color-x-12-36800-default-1.jpg",
    stock: 5,
    precio: 7.49
  },
  {
    id: 3,
    sku: "7754111022194",
    nombre: "PLUMON FIESTA 45 EST CARTON X20U FABER",
    marca: "FABER",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/c/o/colores-triangulares-largos-duo-color-x-2448-artesco-20584-default-1.jpg",
    stock: 2,
    precio: 8.99
  },
  {
    id: 4,
    sku: "7754221008651",
    nombre: "PLUMONES DELGADOS VK-45 X 12 UNIDADES",
    marca: "VIKINGO",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/r/e/resaltador-stabilo-boss-pastel-x-8-unidades-46685-default-1.jpg",
    stock: 6,
    precio: 6.49
  },
  {
    id: 5,
    sku: "7754221008668",
    nombre: "PLUMONES GRUESOS VK-47 X 12 UNID",
    marca: "VIKINGO",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/t/e/tempera-ove-morado-250-ml-28020011-default-1.jpg",
    stock: 9,
    precio: 9.99
  },
  {
    id: 6,
    sku: "7754807772068",
    nombre: "PLUMONES DELGADOS VINIFAN X 12U",
    marca: "VINIFAN",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/r/o/rotulador-stabilo-extrafino-88-estuche-x-10-unidades-766-default-1.jpg",
    stock: 4,
    precio: 6.79
  },
  {
    id: 7,
    sku: "7754111022010",
    nombre: "PLUMON JUMBO FABER X 12U",
    marca: "FABER",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/b/o/boligrafo-pilot-frix-blfr7-azul-rpto-x1-26411001-default-1.jpg",
    stock: 3,
    precio: 10.99
  },
  {
    id: 8,
    sku: "7754221008682",
    nombre: "PLUMONES GRUESOS VK-47 X 6 UNID",
    marca: "VIKINGO",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/c/u/cuaderno-anillado-surco-a5-140-hojas-diseno-5d-49135-default-1.jpg",
    stock: 4,
    precio: 5.99
  },
  {
    id: 9,
    sku: "7754221008699",
    nombre: "PLUMONES DELGADOS VK-45 X 12 UNIDAD",
    marca: "VIKINGO",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/c/u/cuaderno-anillado-cuadriculado-minerva-a5-diseno-mujer-150-hojas-33819-default-1.jpg",
    stock: 6,
    precio: 6.49
  },
  {
    id: 10,
    sku: "7754807772450",
    nombre: "PLUMONES JUMBO X12 VINIFAN",
    marca: "VINIFAN",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/r/e/resaltador-metalico-x4-artesco-55953-default-1.jpg",
    stock: 3,
    precio: 7.99
  },
  {
    id: 11,
    sku: "7754111022200",
    nombre: "PLUMON FIESTA X 20 FABER",
    marca: "FABER",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/p/l/plumon-crayola-x-100-delgados-lavables-56587-default-1.jpg",
    stock: 2,
    precio: 8.49
  },
  {
    id: 12,
    sku: "7754221008722",
    nombre: "PLUMONES DELGADOS 45 X 6 UNID",
    marca: "VIKINGO",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/m/a/maletin-de-crayones-mini-twistables-24886-default-1.jpg",
    stock: 6,
    precio: 5.99
  },
  {
    id: 13,
    sku: "7754807772474",
    nombre: "PLUMONES GRUESOS X6 EST VINIFAN",
    marca: "VINIFAN",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/c/o/colores-ove-bicolor-x-12-und-32593-default-1.jpg",
    stock: 4,
    precio: 6.49
  },
  {
    id: 14,
    sku: "7754111022225",
    nombre: "PLUMON MULTIUSOS X 12 FABER",
    marca: "FABER",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/t/i/tiza-crayola-jumbo-lavablecax48-72238-default-1.jpg",
    stock: 8,
    precio: 9.49
  },
  {
    id: 15,
    sku: "7754221008703",
    nombre: "PLUMONES GRUESOS 47 X 6 UNIDADES",
    marca: "VIKINGO",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/p/l/plumones-power-tips-x-100-artesco-65728-default-1.jpg",
    stock: 2,
    precio: 7.99
  },
  {
    id: 16,
    sku: "7754221008710",
    nombre: "PLUMONES SUPER JUMBO X 12 UNIDADES",
    marca: "VIKINGO",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/r/o/rotulador-ove-brush-metalico-x-8-colores-62812-default-1.jpg",
    stock: 1,
    precio: 10.99
  },
  {
    id: 17,
    sku: "7754807772482",
    nombre: "PLUMON DELGADO X 6 UNIDAD VINIFAN",
    marca: "VINIFAN",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/b/o/boligrafo-trimax-gl32m-trend-surtido-x10-artesco-41827-default-1.jpg",
    stock: 1,
    precio: 10.50
  },
  {
    id: 18,
    sku: "7754111022240",
    nombre: "PLUMON JUMBO X6 FABER",
    marca: "FABER",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/r/e/resaltador-textliner-x155m6p4n-faber-castell-57901-default-1.jpg",
    stock: 6,
    precio: 7.99
  },
  {
    id: 19,
    sku: "7754221008739",
    nombre: "PLUMON X 6 EST VIKINGO",
    marca: "VIKINGO",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/t/e/tempera-x-6-escarchada-artesco-29480-default-1.jpg",
    stock: 4,
    precio: 6.79
  },
  {
    id: 20,
    sku: "7754221008746",
    nombre: "PLUMONES GRUESOS 47 X 6 UNIDAD",
    marca: "VIKINGO",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/p/a/papel-bulky-a4-graphos-pqx500-183-default-1.jpg",
    stock: 3,
    precio: 8.49
  },
  {
    id: 21,
    sku: "7754807772503",
    nombre: "PLUMONES X 12 VINIFAN",
    marca: "VINIFAN",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/p/a/papel-fotoc-chamex-75gr-of-pqtx500-200-default-1.jpg",
    stock: 8,
    precio: 7.49
  },
  {
    id: 22,
    sku: "7754111022257",
    nombre: "PLUMON MULTIUSO X 6 FABER",
    marca: "FABER",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/t/e/tempera-x-7-fab-225-default-1.jpg",
    stock: 4,
    precio: 9.99
  },
  {
    id: 23,
    sku: "7754221008753",
    nombre: "PLUMON X 12 UNIDAD VIKINGO",
    marca: "VIKINGO",
    img: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/240x300/productos/i/f/o/forro-cristal-249-default-1.jpg",
    stock: 7,
    precio: 6.99
  },
  {
    id: 24,
    sku: "7754111022271",
    nombre: "PLUMON FIESTA 45 EST X 12 FABER",
    marca: "FABER",
    img: "https://res.cloudinary.com/riqra/image/upload/w_240,h_240,c_limit,q_auto,f_auto/v1735833095/utilex/products/1b3ed2e1145f1efd.jpg",
    stock: 5,
    precio: 7.99
  },
  {
    id: 25,
    sku: "7754221008760",
    nombre: "PLUMON GRUESO 47 X 6 UNIDAD",
    marca: "VIKINGO",
    img: "https://res.cloudinary.com/riqra/image/upload/w_240,h_240,c_limit,q_auto,f_auto/v1735841926/utilex/products/5d59334b8e57d459.jpg",
    stock: 6,
    precio: 5.99
  },
  {
    id: 26,
    sku: "7754807772510",
    nombre: "PLUMON DELGADO VINIFAN X 6U",
    marca: "VINIFAN",
    img: "https://res.cloudinary.com/riqra/image/upload/w_240,h_240,c_limit,q_auto,f_auto/v1735844245/utilex/products/b38e94198e68acdc.jpg",
    stock: 2,
    precio: 6.49
  },
  {
    id: 27,
    sku: "7754111022288",
    nombre: "PLUMON SUPER JUMBO X 12 FABER",
    marca: "FABER",
    img: "https://res.cloudinary.com/riqra/image/upload/w_240,h_240,c_limit,q_auto,f_auto/v1735838717/utilex/products/beb7c5daafbf501d.jpg",
    stock: 8,
    precio: 9.49
  },
  {
    id: 28,
    sku: "7754221008777",
    nombre: "PLUMON FIESTA X 20 FABER",
    marca: "FABER",
    img: "https://res.cloudinary.com/riqra/image/upload/w_240,h_240,c_limit,q_auto,f_auto/v1740828480/utilex/products/ee1e4137074f47e4.jpg",
    stock: 5,
    precio: 10.99
  },
  {
    id: 29,
    sku: "7754221008784",
    nombre: "PLUMON GRUESO 45 X 6 UNIDAD",
    marca: "VIKINGO",
    img: "https://res.cloudinary.com/riqra/image/upload/w_240,h_240,c_limit,q_auto,f_auto/v1740828480/utilex/products/ee1e4137074f47e4.jpg",
    stock: 5,
    precio: 8.49
  },
  {
    id: 30,
    sku: "7754807772527",
    nombre: "PLUMON GRUESO X12 VINIFAN",
    marca: "VINIFAN",
    img: "https://res.cloudinary.com/riqra/image/upload/w_240,h_240,c_limit,q_auto,f_auto/v1740828480/utilex/products/ee1e4137074f47e4.jpg",
    stock: 3,
    precio: 6.99
  },
];

