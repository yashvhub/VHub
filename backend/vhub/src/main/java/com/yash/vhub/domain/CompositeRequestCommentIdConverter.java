package com.yash.vhub.domain;

import org.springframework.core.convert.converter.Converter;

public class CompositeRequestCommentIdConverter implements Converter<String, CompositeRequestCommentId> {

	@Override
	public CompositeRequestCommentId convert(String source) {
		CompositeRequestCommentId compositeRequestCommentId = new CompositeRequestCommentId();
		String[] ids = source.split("_");
		compositeRequestCommentId.setRequestId(Long.parseLong(ids[0]));
		compositeRequestCommentId.setId(Long.parseLong(ids[1]));
		return compositeRequestCommentId;
	}
}
