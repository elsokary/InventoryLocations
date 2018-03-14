using System.Reflection;
using System.Threading.Tasks;
using System.Web.Cors;
using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.Cors;

using Ninject;
using Ninject.Web.Common;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;

using Inventory_Location.configuration;
using InventoryInterface.IDataService;
using InventoryDataService.Repository;
using Inventory_Location;
using System.IO;
using DataServices.Repository;
using Interface.IDataService;

[assembly: OwinStartup(typeof(Inventory_Location.Startup))]

namespace Inventory_Location
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var policy = new CorsPolicy
            {
                AllowAnyHeader = true,
                AllowAnyMethod = true,
                SupportsCredentials = true
            };

            policy.ExposedHeaders.Add("Authorization");

            app.UseCors(new CorsOptions
            {
                PolicyProvider = new CorsPolicyProvider
                {
                    PolicyResolver = context => Task.FromResult(policy)
                }
            });

            var config = new HttpConfiguration();

            api_config.Register(config);

            app.UseNinjectMiddleware(CreateKernel);
            app.UseNinjectWebApi(config);
        }

        private static StandardKernel CreateKernel()
        {
            var kernel = new StandardKernel();
             
            kernel.Bind<ISupplyOrderItemsRepository>().To<SupplyOrderItemsRepository>().InRequestScope();
            kernel.Bind<ISupplyOrderRepository>().To<SupplyOrderRepository>().InRequestScope();
              
            kernel.Bind<IInvoiceItemsRepository>().To<InvoiceItemsRepository>().InRequestScope(); 
            kernel.Bind<IDefaultListRepository>().To<DefaultListRepository>().InRequestScope(); 
            
            kernel.Bind<IInvoicesRepository>().To<InvoicesRepository>().InRequestScope();  
            kernel.Bind<IInventorylogRepository>().To<InventorylogRepository>().InRequestScope();
            kernel.Bind<ITransactionTypesRepository>().To<TransactionTypesRepository>().InRequestScope();
            kernel.Bind<IInventoryRepository>().To<InventoryRepository>().InRequestScope();
            kernel.Bind<IAccountsRepository>().To<AccountsRepository>().InRequestScope(); 
            kernel.Bind<IBranchesRepository>().To<BranchesRepository>().InRequestScope(); 
            kernel.Bind<ICustomersRepository>().To<CustomersRepository>().InRequestScope();
            kernel.Bind<IGrouppermissionsRepository>().To<GrouppermissionsRepository>().InRequestScope();
            kernel.Bind<IGroupsRepository>().To<GroupsRepository>().InRequestScope();
            kernel.Bind<IItemsdecriptionRepository>().To<ItemsdecriptionRepository>().InRequestScope();
            kernel.Bind<ISuppliersRepository>().To<SuppliersRepository>().InRequestScope(); 

            kernel.Bind<ICashierRepository>().To<CashierRepository>().InRequestScope();
            kernel.Bind<ICashierItemsRepository>().To<CashierItemsRepository>().InRequestScope();
            kernel.Bind<IRefundIemsRepository>().To<RefundIemsRepository>().InRequestScope();
            kernel.Bind<IRefundsRepository>().To<RefundsRepository>().InRequestScope();

            kernel.Bind<ILocationsRepository>().To<LocationsRepository>().InRequestScope();

            kernel.Bind<ITransactionsRepository>().To<TransactionsRepository>().InRequestScope(); 
            kernel.Bind<ILocationsItemsRepository>().To<LocationsItemsRepository>().InRequestScope(); 

            return kernel;
        }
    }
}
