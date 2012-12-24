package my.app.bookrepository.service;

import my.app.bookrepository.domain.Page;

public interface PageService {

	/**
	 * <p>
	 * クライアントサイドで要求したページング情報が
	 * 現状のサーバ側の状態と等しいかどうかを判定する。
	 * </p>
	 *
	 * <p>
	 * 現状のサーバ側の状態と等しい場合、リクエストと同等の
	 * ページャ情報を返す。
	 * 現状のサーバ側の状態がリクエストと変化している場合は、
	 * 変化した情報を反映する。
	 * </p>
     *
	 * @param serverItemSize
	 * @param currentIndex
	 * @param maxPerPageSize
	 * @return
	 */
	Page evaluate(int serverItemSize, int currentIndex, int maxPerPageSize);
}
