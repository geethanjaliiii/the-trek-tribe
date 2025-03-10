import { BaseRoute } from "../baseRoute"
import VendorRoutes from "../vendor/vendor.route";

export  class PrivateRoutes extends BaseRoute{
constructor(){
    super();
}

protected initializeRoutes(): void {
    // this.router.use('/_ad',new AdminRoutes().router)
    this.router.use('/_ve',new VendorRoutes().router);
}
}