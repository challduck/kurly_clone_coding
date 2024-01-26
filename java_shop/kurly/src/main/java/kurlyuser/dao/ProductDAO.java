package kurlyuser.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import kurlyuser.DatabaseConnection;
import kurlyuser.dto.CartItemDTO;
import kurlyuser.dto.ProductDTO;

public class ProductDAO { 
	// 전체 상품 가져오는 리스트
    public List<ProductDTO> getAllProducts() {
        List<ProductDTO> productList = new ArrayList<>();
        String selectAllProductsSql = "SELECT * FROM product";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement selectAllProductsStatement = conn.prepareStatement(selectAllProductsSql)) {

            try (ResultSet resultSet = selectAllProductsStatement.executeQuery()) {
                while (resultSet.next()) {
                    ProductDTO product = new ProductDTO();
                    product.setProductId(resultSet.getLong("product_id"));
                    product.setProductCode(resultSet.getString("product_code"));
                    product.setCategoryId(resultSet.getLong("category_id"));
                    product.setProductName(resultSet.getString("product_name"));
                    product.setProductDescription(resultSet.getString("product_description"));
                    product.setProductPrice(resultSet.getInt("product_price"));
                    product.setProductThumbnailImage(resultSet.getString("product_thumnail_image"));
                    product.setProductDiscount(resultSet.getString("product_discount"));
                    product.setProductDistributor(resultSet.getString("product_distributor"));
                    product.setProductStorage(resultSet.getString("product_storage"));
                    product.setProductQuantity(resultSet.getInt("product_quantity"));
                    product.setProductEvent(resultSet.getString("product_event"));
                    product.setProductDelete(resultSet.getString("product_delete").charAt(0));
                    product.setProductRegistration(resultSet.getTimestamp("product_registration"));

                    productList.add(product);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return productList;
    }
	
    // 특정 상품 ID를 기반으로 상품 정보 가져오기
    public ProductDTO getProductById(long productId) {
        ProductDTO product = null;

        String selectProductSql = "SELECT * FROM product WHERE product_id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement selectProductStatement = conn.prepareStatement(selectProductSql)) {

            selectProductStatement.setLong(1, productId);

            try (ResultSet resultSet = selectProductStatement.executeQuery()) {
                if (resultSet.next()) {
                    product = new ProductDTO();
                    product.setProductId(resultSet.getLong("product_id"));
                    product.setProductCode(resultSet.getString("product_code"));
                    product.setCategoryId(resultSet.getLong("category_id"));
                    product.setProductName(resultSet.getString("product_name"));
                    product.setProductDescription(resultSet.getString("product_description"));
                    product.setProductPrice(resultSet.getInt("product_price"));
                    product.setProductThumbnailImage(resultSet.getString("product_thumbnail_image"));
                    product.setProductDiscount(resultSet.getString("product_discount"));
                    product.setProductDistributor(resultSet.getString("product_distributor"));
                    product.setProductStorage(resultSet.getString("product_storage"));
                    product.setProductQuantity(resultSet.getInt("product_quantity"));
                    product.setProductEvent(resultSet.getString("product_event"));
                    product.setProductDelete(resultSet.getString("product_delete").charAt(0));
                    product.setProductRegistration(resultSet.getTimestamp("product_registration"));
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return product;
    }
    
    public List<ProductDTO> getCartItems(String userId) {
        List<ProductDTO> cartItems = new ArrayList<>();
        String selectCartItemsSql = "SELECT cp.cart_product_id, cp.product_id, cp.product_cart_quantity, " +
                "p.product_code, p.category_id, p.product_name, p.product_description, " +
                "p.product_price, p.product_thumnail_image, p.product_discount, " +
                "p.product_distributor, p.product_storage, p.product_quantity, " +
                "p.product_event, p.product_delete, p.product_registration " +
                "FROM cart_product cp " +
                "JOIN cart c ON cp.cart_product_id = c.cart_product_id " +
                "JOIN user u ON c.user_key = u.user_key " +
                "JOIN product p ON cp.product_id = p.product_id " +
                "WHERE u.user_id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement selectCartItemsStatement = conn.prepareStatement(selectCartItemsSql)) {

            selectCartItemsStatement.setString(1, userId);

            try (ResultSet resultSet = selectCartItemsStatement.executeQuery()) {
                while (resultSet.next()) {
                    ProductDTO product = new ProductDTO();
                    product.setProductId(resultSet.getLong("product_id"));
                    product.setProductCode(resultSet.getString("product_code"));
                    product.setCategoryId(resultSet.getLong("category_id"));
                    product.setProductName(resultSet.getString("product_name"));
                    product.setProductDescription(resultSet.getString("product_description"));
                    product.setProductPrice(resultSet.getInt("product_price"));
                    product.setProductThumbnailImage(resultSet.getString("product_thumnail_image"));
                    product.setProductDiscount(resultSet.getString("product_discount"));
                    product.setProductDistributor(resultSet.getString("product_distributor"));
                    product.setProductStorage(resultSet.getString("product_storage"));
                    product.setProductQuantity(resultSet.getInt("product_cart_quantity"));
                    product.setProductEvent(resultSet.getString("product_event"));
                    product.setProductDelete(resultSet.getString("product_delete") != null ?
                            resultSet.getString("product_delete").charAt(0) : null);
                    product.setProductRegistration(resultSet.getTimestamp("product_registration"));

                    cartItems.add(product);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();  // 예외 처리는 이곳에 로깅이나 예외 처리를 추가해주셔야 합니다.
        }

        return cartItems;
    }

	// 장바구니 추가 또는 수량 증가 메서드 (productCode 기준)
	public boolean addOrUpdateCartProduct(String userId, String productCode, int quantity) {
	    String selectProductSql = "SELECT cp.cart_product_id, cp.product_cart_quantity " +
	            "FROM cart_product cp " +
	            "JOIN cart c ON cp.cart_product_id = c.cart_product_id " +
	            "JOIN user u ON c.user_key = u.user_key " +
	            "JOIN product p ON cp.product_id = p.product_id " +
	            "WHERE u.user_id = ? AND p.product_code = ?";
	    String insertProductSql = "INSERT INTO cart_product (product_id, product_cart_quantity) VALUES (?, ?)";
	    String updateProductSql = "UPDATE cart_product SET product_cart_quantity = ? WHERE cart_product_id = ?";
	    String insertCartSql = "INSERT INTO cart (user_key, cart_product_id) VALUES ((SELECT user_key FROM user WHERE user_id = ?), ?)";
	
	    try (Connection conn = DatabaseConnection.getConnection();
	         PreparedStatement selectProductStatement = conn.prepareStatement(selectProductSql);
	         PreparedStatement insertProductStatement = conn.prepareStatement(insertProductSql, PreparedStatement.RETURN_GENERATED_KEYS);
	         PreparedStatement updateProductStatement = conn.prepareStatement(updateProductSql);
	         PreparedStatement insertCartStatement = conn.prepareStatement(insertCartSql)) {
	
	        // 1. 상품이 이미 존재하는지 확인
	        selectProductStatement.setString(1, userId);
	        selectProductStatement.setString(2, productCode);
	
	        try (ResultSet resultSet = selectProductStatement.executeQuery()) {
	            if (resultSet.next()) {
	                // 이미 존재하는 경우, 수량 증가
	                long cartProductId = resultSet.getLong("cart_product_id");
	                int currentQuantity = resultSet.getInt("product_cart_quantity");
	                int newQuantity = currentQuantity + 1;
	
	                // 상품 수량 업데이트
	                updateProductStatement.setInt(1, newQuantity);
	                updateProductStatement.setLong(2, cartProductId);
	                int rowsUpdated = updateProductStatement.executeUpdate();
	
	                return rowsUpdated > 0; // 업데이트 성공 여부 반환
	            } else {
	                // 2. 존재하지 않는 경우, 신규 상품 추가
	                // productCode를 사용하여 product_id를 가져옴
	                long productId = getProductIDByCode(productCode);
	
	                insertProductStatement.setLong(1, productId);
	                insertProductStatement.setInt(2, quantity);
	                int affectedRows = insertProductStatement.executeUpdate();
	
	                if (affectedRows == 0) {
	                    throw new SQLException("상품 추가에 실패하였습니다.");
	                }
	
	                // 생성된 cart_product_id 가져오기
	                long cartProductId;
	                try (ResultSet generatedKeys = insertProductStatement.getGeneratedKeys()) {
	                    if (generatedKeys.next()) {
	                        cartProductId = generatedKeys.getLong(1);
	                    } else {
	                        throw new SQLException("cart_product_id를 가져오지 못했습니다.");
	                    }
	                }
	
	                // 3. 장바구니 테이블에 데이터 추가
	                insertCartStatement.setString(1, userId);
	                insertCartStatement.setLong(2, cartProductId);
	                int rowsAffected = insertCartStatement.executeUpdate();
	
	                // rowsAffected가 0보다 크면 성공적으로 추가된 것
	                return rowsAffected > 0;
	            }
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	
	    return false; // 실패 시 false 반환
	}

	// productCode를 사용하여 product_id를 가져오는 메서드
	private long getProductIDByCode(String productCode) {
	    String selectProductIdSql = "SELECT product_id FROM product WHERE product_code = ?";
	    try (Connection conn = DatabaseConnection.getConnection();
	         PreparedStatement selectProductIdStatement = conn.prepareStatement(selectProductIdSql)) {
	        selectProductIdStatement.setString(1, productCode);
	
	        try (ResultSet resultSet = selectProductIdStatement.executeQuery()) {
	            if (resultSet.next()) {
	                return resultSet.getLong("product_id");
	            }
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return 0;
	}
	
	// 장바구니 삭제 메서드 (productCode 기준)
	public boolean deleteCartProduct(String userId, String productCode) {
	    String getCartProductIdSql = "SELECT cp.cart_product_id " +
	                                "FROM cart_product cp " +
	                                "JOIN cart c ON cp.cart_product_id = c.cart_product_id " +
	                                "JOIN user u ON c.user_key = u.user_key " +
	                                "JOIN product p ON cp.product_id = p.product_id " +
	                                "WHERE u.user_id = ? AND p.product_code = ?";
	    String deleteCartProductSql = "DELETE FROM cart_product WHERE cart_product_id = ?";
	    String deleteCartSql = "DELETE FROM cart WHERE user_key = (SELECT user_key FROM user WHERE user_id = ?) AND cart_product_id = ?";

	    try (Connection conn = DatabaseConnection.getConnection();
	         PreparedStatement getCartProductIdStatement = conn.prepareStatement(getCartProductIdSql);
	         PreparedStatement deleteCartProductStatement = conn.prepareStatement(deleteCartProductSql);
	         PreparedStatement deleteCartStatement = conn.prepareStatement(deleteCartSql)) {

	        // 1. cart_product_id 가져오기
	        getCartProductIdStatement.setString(1, userId);
	        getCartProductIdStatement.setString(2, productCode);
	        ResultSet resultSet = getCartProductIdStatement.executeQuery();

	        if (resultSet.next()) {
	            long cartProductId = resultSet.getLong("cart_product_id");

	            // 2. cart 테이블에서 데이터 삭제
	            deleteCartStatement.setString(1, userId);
	            deleteCartStatement.setLong(2, cartProductId);
	            int rowsAffectedCart = deleteCartStatement.executeUpdate();

	            // 3. cart_product 테이블에서 상품 삭제
	            deleteCartProductStatement.setLong(1, cartProductId);
	            int affectedRows = deleteCartProductStatement.executeUpdate();

	            // rowsAffected가 0보다 크면 성공적으로 삭제된 것
	            return rowsAffectedCart > 0 && affectedRows > 0;
	        }

	    } catch (SQLException e) {
	        e.printStackTrace();
	    }

	    return false; // 실패 시 false 반환
	}

    
	 // 장바구니 수량 증가 메서드
    public boolean increaseCartProductQuantity(String userId, long productId) {
        String updateProductSql = "UPDATE cart_product cp " +
					                "JOIN cart c ON cp.cart_product_id = c.cart_product_id " +
					                "JOIN user u ON c.user_key = u.user_key " +
					                "SET cp.product_cart_quantity = cp.product_cart_quantity + 1 " +
					                "WHERE u.user_id = ? AND cp.product_id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement updateProductStatement = conn.prepareStatement(updateProductSql)) {

            // 상품 수량 증가
            updateProductStatement.setString(1, userId);
            updateProductStatement.setLong(2, productId);

            int rowsUpdated = updateProductStatement.executeUpdate();

            // rowsUpdated가 0보다 크면 성공적으로 업데이트된 것
            return rowsUpdated > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false; // 실패 시 false 반환
    }

    // 장바구니 수량 감소 메서드
    public boolean decreaseCartProductQuantity(String userId, long productId) {
    	String updateProductSql = "UPDATE cart_product cp " +
					                "JOIN cart c ON cp.cart_product_id = c.cart_product_id " +
					                "JOIN user u ON c.user_key = u.user_key " +
					                "SET cp.product_cart_quantity = cp.product_cart_quantity - 1 " +
					                "WHERE u.user_id = ? AND cp.product_id = ? AND cp.product_cart_quantity > 1";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement updateProductStatement = conn.prepareStatement(updateProductSql)) {

            // 상품 수량 감소
            updateProductStatement.setString(1, userId);
            updateProductStatement.setLong(2, productId);

            int rowsUpdated = updateProductStatement.executeUpdate();

            // rowsUpdated가 0보다 크면 성공적으로 업데이트된 것
            return rowsUpdated > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false; // 실패 시 false 반환
    }
	
}
