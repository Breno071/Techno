namespace net_api.Models
{

    public class Produto
    {
        public string id { get; set; }
        public string nome { get; set; }
        public int preco { get; set; }
        public string descricao { get; set; }
        public int estoque { get; set; }
        public string img { get; set; }
        public Review[] reviews { get; set; }
    }

    public class Review
    {
        public string nome { get; set; }
        public int estrelas { get; set; }
        public string descricao { get; set; }
    }

}
