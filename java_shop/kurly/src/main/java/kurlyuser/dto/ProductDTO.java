package kurlyuser.dto;

import java.sql.Timestamp;

public class ProductDTO {
    public long getProductId() {
		return productId;
	}
	public void setProductId(long productId) {
		this.productId = productId;
	}
	public String getProductCode() {
		return productCode;
	}
	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}
	public long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(long categoryId) {
		this.categoryId = categoryId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getProductDescription() {
		return productDescription;
	}
	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}
	public int getProductPrice() {
		return productPrice;
	}
	public void setProductPrice(int productPrice) {
		this.productPrice = productPrice;
	}
	public String getProductThumbnailImage() {
		return productThumbnailImage;
	}
	public void setProductThumbnailImage(String productThumbnailImage) {
		this.productThumbnailImage = productThumbnailImage;
	}
	public String getProductDiscount() {
		return productDiscount;
	}
	public void setProductDiscount(String productDiscount) {
		this.productDiscount = productDiscount;
	}
	public String getProductDistributor() {
		return productDistributor;
	}
	public void setProductDistributor(String productDistributor) {
		this.productDistributor = productDistributor;
	}
	public String getProductStorage() {
		return productStorage;
	}
	public void setProductStorage(String productStorage) {
		this.productStorage = productStorage;
	}
	public int getProductQuantity() {
		return productQuantity;
	}
	public void setProductQuantity(int productQuantity) {
		this.productQuantity = productQuantity;
	}
	public String getProductEvent() {
		return productEvent;
	}
	public void setProductEvent(String productEvent) {
		this.productEvent = productEvent;
	}
	public Character getProductDelete() {
		return productDelete;
	}
	public void setProductDelete(Character productDelete) {
		this.productDelete = productDelete;
	}
	public Timestamp getProductRegistration() {
		return productRegistration;
	}
	public void setProductRegistration(Timestamp productRegistration) {
		this.productRegistration = productRegistration;
	}
	private long productId;
    private String productCode;
    private long categoryId;
    private String productName;
    private String productDescription;
    private int productPrice;
    private String productThumbnailImage;
    private String productDiscount;
    private String productDistributor;
    private String productStorage;
    private int productQuantity;
    private String productEvent;
    private Character productDelete;
    private Timestamp productRegistration;
}
