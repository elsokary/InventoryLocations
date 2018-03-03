using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace InventoryModel
{

    public class DtoAccounts
    {
        public int id
        {
            get;
            set;
        }

        public string userName
        {
            get;
            set;
        }

        public string contactName
        {
            get;
            set;
        }

        public string passWord
        {
            get;
            set;
        }

        public string address
        {
            get;
            set;
        }

        public string phone
        {
            get;
            set;
        }

        public string email
        {
            get;
            set;
        }

        public int? groupId
        {
            get;
            set;
        }
        public int? branchId
        {
            get;
            set;
        }

        public string groupName
        {
            get;
            set;
        }
        public string branchName
        {
            get;
            set;
        }

        public int? supervisorId
        {
            get;
            set;
        }

        public string supervisorName
        {
            get;
            set;
        }

        public string userType
        {
            get;
            set;
        }

        public TimeSpan? loggedTime { get; set; }
        public TimeSpan? shiftIn { get; set; }
        public TimeSpan? shiftOut { get; set; }
    }

}

