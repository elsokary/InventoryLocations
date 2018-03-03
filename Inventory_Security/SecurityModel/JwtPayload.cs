namespace Inventory_Security.SecurityModel
{
    public class JwtPayload
    {
        // ReSharper disable once InconsistentNaming
        public string iss { get; set; }
        // ReSharper disable once InconsistentNaming
        public string sub { get; set; }
        // ReSharper disable once InconsistentNaming 
        public long exp { get; set; }
        public string uty { get; set; }
        public string gri { get; set; }

        public string bci { get; set; }

        public string acn { get; set; }

        public string contactName { get; set; }
        public string dbi { get; set; }
    }
}
